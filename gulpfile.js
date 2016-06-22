var gulp = require('gulp'),
    concat = require('gulp-concat'),

    tsc = require('gulp-typescript'),
    mocha = require('gulp-mocha'),
    jsMinify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),

    scssLint = require('gulp-scss-lint'),
    sass = require('gulp-sass'),
    cssPrefixer = require('gulp-autoprefixer'),
    cssMinify = require('gulp-cssnano'),

    del = require('del'),
    merge = require('merge-stream'),
    SystemBuilder = require('systemjs-builder');

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
    var tsProject = tsc.createProject('tsconfig.json'),
        tsResult = tsProject.src()
            .pipe(tsc(tsProject));

    return tsResult.js
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

gulp.task('lintScss', function() {
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

gulp.task('test-tsc', () => {
    var tsProject = tsc.createProject('tsconfig.json');

    return tsProject.src()
        .pipe(tsc(tsProject))
        .pipe(gulp.dest('test/js/'));
});

gulp.task('test-run', [ 'test-tsc' ], () => {
    return gulp.src('test/**/*.spec.js')
        .pipe(mocha());
});

gulp.task('test', [ 'test-run' ], () => {
    return del('test/js');
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
        watchScss = gulp.watch('src/scss/**/*.scss', [ 'lintScss', 'scss' ]),
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
    'lintScss',
    'scss'
]);

