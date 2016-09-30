var gulp = require('gulp'),
    del = require('del'),
    merge = require('merge-stream'),

    tsc = require('gulp-typescript'),
    tsProject = tsc.createProject('tsconfig.json'),
    SystemBuilder = require('systemjs-builder'),
    jsMinify = require('gulp-uglify'),

    mocha = require('gulp-mocha'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),

    scssLint = require('gulp-scss-lint'),
    sass = require('gulp-sass'),
    cssPrefixer = require('gulp-autoprefixer'),
    cssMinify = require('gulp-cssnano');

gulp.task('clean', () => {
    return del('dist');
});

gulp.task('shims', () => {
    return gulp.src([
            'node_modules/core-js/client/shim.js',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/reflect-metadata/Reflect.js'
        ])
        .pipe(concat('shims.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('system-build', [ 'tsc' ], () => {
    var builder = new SystemBuilder();

    return builder.loadConfig('system.config.js')
        .then(() => builder.buildStatic('app', 'dist/js/bundle.js'))
        .then(() => del('build'));
});

gulp.task('tsc', () => {
    del('build');

    return gulp.src('src/app/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('build/'));
});

gulp.task('html', () => {
    return gulp.src('src/**/**.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', () => {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('scss-lint', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(scssLint({ config: 'lint.yml' }));
});

gulp.task('scss', () => {
    return gulp.src('src/scss/main.scss')
        .pipe(sass({
            precision: 10,
            includePaths: 'node_modules/node-normalize-scss'
        }))
        .pipe(concat('styles.css'))
        .pipe(cssPrefixer())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('test-run', [ 'tsc' ], () => {
    return gulp.src('test/**/*.spec.js')
        .pipe(mocha());
});

gulp.task('test', [ 'test-run' ], () => {
    return del('build');
});

gulp.task('minify', () => {
    var js = gulp.src('dist/js/bundle.js')
        .pipe(jsMinify())
        .pipe(gulp.dest('dist/js/'));

    var css = gulp.src('dist/css/styles.css')
        .pipe(cssMinify())
        .pipe(gulp.dest('dist/css/'));

    return merge(js, css);
});

gulp.task('watch', () => {
    var watchTs = gulp.watch('src/app/**/**.ts', [ 'system-build' ]),
        watchScss = gulp.watch('src/scss/**/*.scss', [ 'scss-lint', 'scss' ]),
        watchHtml = gulp.watch('src/**/*.html', [ 'html' ]),
        watchImages = gulp.watch('src/images/**/*.*', [ 'images' ]),

        onChanged = function(event) {
            console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
        };

    watchTs.on('change', onChanged);
    watchScss.on('change', onChanged);
    watchHtml.on('change', onChanged);
    watchImages.on('change', onChanged);
});

gulp.task('watchtests', () => {
    var watchTs = gulp.watch('src/app/**/**.ts', [ 'test-run' ]),
        watchTests = gulp.watch('test/**/*.spec.js', [ 'test-run' ]),

    onChanged = function(event) {
        console.log('File ' + event.path + ' was ' + event.type + '. Running tasks...');
    };

    watchTs.on('change', onChanged);
    watchTests.on('change', onChanged);
});

gulp.task('default', [
    'shims',
    'system-build',
    'html',
    'images',
    'scss-lint',
    'scss'
]);

