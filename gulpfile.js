const gulp = require('gulp');
const connect = require('gulp-connect');
const less = require('gulp-less');
//服务器
gulp.task('server', function () {
    connect.server({
        port: 8080,
        livereload: true
    })
})
//转移文件
gulp.task('html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload())
})
gulp.task('less', function () {
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
})
gulp.task('js', function () {
    gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
})
//监听文件变化
const watch1 = gulp.watch('./src/index.html');
watch1.on('change', gulp.parallel('html'));
const watch2 = gulp.watch('./src/css/*.less');
watch2.on('change', gulp.parallel('less'));
const watch3 = gulp.watch('./src/js/*.js');
watch3.on('change', gulp.parallel('js'));
//触发事件
gulp.task('default', gulp.parallel('html', 'less', 'js', 'server'));

