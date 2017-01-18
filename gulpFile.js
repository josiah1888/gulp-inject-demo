var gulp = require('gulp');
var inject = require('gulp-inject');

gulp.task('default', ['inject', 'assets'], function() { });

gulp.task('inject', function() {
    return gulp.src(['src/**/*.html', '!src/partials/**'])
        .pipe(inject(gulp.src(['src/partials/head.html']), createInjectOptions('head')))
        .pipe(inject(gulp.src(['src/partials/header.html']), createInjectOptions('header')))
        .pipe(inject(gulp.src(['src/partials/footer.html']), createInjectOptions('footer')))
        .pipe(inject(gulp.src(['src/partials/scripts.html']), createInjectOptions('scripts')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('assets', function() {
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
