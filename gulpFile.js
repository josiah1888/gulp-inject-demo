var gulp = require('gulp');
var inject = require('gulp-inject');

// Define tasks for gulp to execute
gulp.task('default', ['inject', 'assets'], function() { });

gulp.task('inject', function() {
    
    // Grab all the html files, except the partials
    return gulp.src(['src/**/*.html', '!src/partials/**'])

        // Inject the partials into the regular html files
        .pipe(inject(gulp.src(['src/partials/head.html']), createInjectOptions('head')))
        .pipe(inject(gulp.src(['src/partials/header.html']), createInjectOptions('header')))
        .pipe(inject(gulp.src(['src/partials/footer.html']), createInjectOptions('footer')))
        .pipe(inject(gulp.src(['src/partials/scripts.html']), createInjectOptions('scripts')))

        // Copy the results into dist/
        .pipe(gulp.dest('dist/'));
});

gulp.task('assets', function() {
    // Copy assets (js, css) into dist/
    return gulp.src(['src/assets/**'])
        .pipe(gulp.dest('dist/'));
});

function createInjectOptions(tagName) {
    return {
        starttag: `<!-- inject:${tagName}:{{ext}} -->`,
        transform: function (filePath, file) {
            return file.contents.toString('utf8')
        }
    };
}
