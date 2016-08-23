var gulp = require('gulp-help')(require('gulp'));
var browserify = require('browserify');
var sourceStream = require('vinyl-source-stream');
var ngAnnotate = require('gulp-ng-annotate');
var express = require('express');
var colors = require('colors');
var print = require('gulp-print');
var changed = require('gulp-changed');
var rimraf = require('rimraf');
var rename = require('gulp-rename');
var requireGlobify = require('require-globify');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var babelify = require('babelify');
var notifier = require('node-notifier');
var path = require('path');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob-import');
var strictify = require('strictify');
var mergeStream = require('merge-stream');

// Configuration
// -------------

var conf = {
    port: 1337,
    src: './src',
    dest: './dest',
    externalStyles: [
        './node_modules/angular-material/angular-material.css'
    ]
};

// Default task
// ------------

gulp.task('default', ['build', 'watch', 'serve']);

// Misc. tasks
// -----------

gulp.task('serve', (cb) => {
    var app = express();
    app.use(express.static(`${conf.dest}`));
    app.use((req, res) => {
        res.sendFile(path.resolve(`${conf.dest}/index.html`));
    });
    app.listen(conf.port, (err) => {
        if (err)
            return cb(err);
        console.log(colors.green(`Dev server listening on port ${conf.port}`));
        cb();
    });
});

gulp.task('clean', (cb) => {
    rimraf(`${conf.dest}/*`, cb);
});

gulp.task('minify', ['build'], () => {
    gulp.src(`${conf.dest}/bundle.js`)
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(conf.dest));
});

// Watch tasks
// -----------

gulp.task('watch', ['watch:js', 'watch:styles', 'watch:html', 'watch:assets'])

gulp.task('watch:js',     () => gulp.watch([`${conf.src}/js/**/*.js`, './.env.js'], ['build:js']));
gulp.task('watch:styles', () => gulp.watch(`${conf.src}/styles/**/*.scss`,          ['build:styles']));
gulp.task('watch:html',   () => gulp.watch(`${conf.src}/views/**/*.html`,           ['build:html']));
gulp.task('watch:assets', () => gulp.watch(`${conf.src}/assets/**/*.*`,             ['build:assets']))

// Build tasks
// -----------

gulp.task('build', ['build:js', 'build:styles', 'build:html', 'build:assets']);

gulp.task('build:js', () => {
    browserify(`${conf.src}/js/entry.js`)
        .transform(babelify.configure({
            presets: ['es2015']
        }))
        .transform(requireGlobify)
        .transform(strictify)
        .bundle()
        .on('error', function (err) {
            console.log(colors.red(err.toString()));
            console.log(err.codeFrame);
            var message = '';
            if (err.filename) {
                message += err.filename;
            }
            if (err.loc) {
                message += ' [' + err.loc.line + ':' + err.loc.column + ']';
            }
            notifier.notify({
                title: 'Browserify error',
                message: message,
                sound: true
            });
            this.emit('end');
        })
        .pipe(sourceStream('bundle.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest(conf.dest));
});

gulp.task('build:styles', () => {
    var myStyles = gulp.src(`${conf.src}/styles/entry.scss`)
        .pipe(plumber())
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(rename('styles.css'))
        .pipe(plumber.stop());

    var externalStyles = gulp.src(conf.externalStyles);

    return mergeStream(myStyles, externalStyles)
        .pipe(gulp.dest(`${conf.dest}`));
});

gulp.task('build:html', () => {
    gulp.src(`${conf.src}/views/**/*.html`)
        .pipe(gulp.dest(`${conf.dest}`));
});

gulp.task('build:assets', () => {
    return gulp.src(`${conf.src}/assets/**/*.*`)
        .pipe(gulp.dest(`${conf.dest}/assets`));
})
