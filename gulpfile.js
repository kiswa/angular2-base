var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),

    tsc = require('gulp-typescript'),
    jsMinify = require('gulp-uglify'),

    scsslint = require('gulp-scss-lint'),
    sass = require('gulp-ruby-sass'),
    cssPrefixer = require('gulp-autoprefixer'),
    cssMinify = require('gulp-cssnano'),

    imageMin = require('gulp-imagemin'),

    node,
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,

    src = 'src/',
    dist = 'dist/',
    paths = {
        tsconfig: src + 'app/tsconfig.json',
        ts: src + 'app/**/*.ts',
        html: src + '**/*.html',
        images: src + 'images/**/*.*',
        scss: src + 'scss/**/*.scss',
        scssmain: src + 'scss/main.scss',
        vendor: {
            js: [
                'node_modules/angular2/bundles/angular2-polyfills.js',
                'node_modules/es6-shim/es6-shim.js',
                'node_modules/systemjs/dist/system-polyfills.src.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/angular2.dev.js'
            ],
            css: [
                'node_modules/normalize.css/normalize.css'
            ]
        }
    };

gulp.task('clean', function() {
    return del(dist);
});

gulp.task('html', function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(dist));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imageMin())
        .pipe(gulp.dest(dist + 'images/'));
});

gulp.task('lintScss', function() {
    return gulp.src(paths.scss)
        .pipe(scsslint({ config: 'lint.yml' }));
});

gulp.task('styles', function() {
    return sass(paths.scssmain, { precision: 10 })
        .pipe(concat('styles.css'))
        .pipe(cssPrefixer())
        .pipe(gulp.dest(dist + 'css/'));
});

gulp.task('tsc', function() {
    var tsProject = tsc.createProject(paths.tsconfig),
        tsResult = tsProject.src()
            .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(gulp.dest(dist + 'app/'));
});

gulp.task('vendor', function() {
    var js = gulp.src(paths.vendor.js)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist + 'js/'));

    var css = gulp.src(paths.vendor.css)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(dist + 'css/'));

    return merge(js, css);
});

gulp.task('minify', function() {
    var js = gulp.src(dist + 'js/vendor.js')
        .pipe(jsMinify())
        .pipe(gulp.dest(dist + 'js/'));

    var css = gulp.src(dist + 'css/vendor.css')
        .pipe(cssMinify())
        .pipe(gulp.dest(dist + 'css/'));
});

gulp.task('fb-flo', function() {
    if (node) {
        node.kill();
    }

    node = spawn('node', ['flo.js'], { stdio: 'inherit' });
    node.on('close', function() {
        console.log('Exiting fb-flo.');
    });
});

gulp.task('watch', function() {
    var watchTs = gulp.watch(paths.ts, ['tsc']),
        watchScss = gulp.watch(paths.scss, ['lintScss', 'styles']),
        watchHtml = gulp.watch(paths.html, ['html']),
        watchImages = gulp.watch(paths.images, ['images']),

        onChanged = function(event) {
            console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
        };

    gulp.start('fb-flo');

    watchTs.on('change', onChanged);
    watchScss.on('change', onChanged);
    watchHtml.on('change', onChanged);
    watchImages.on('change', onChanged);
});

gulp.task('default', ['tsc', 'vendor', 'html', 'images', 'lintScss', 'styles']);
