var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less");
//html文件
gulp.task("html",function(){
    gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"))
        .pipe(connect.reload());
});
//转移js
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
        .pipe(gulp.dest("./dist/js"))
        .pipe(connect.reload());
})
//转换less到css
gulp.task("less",function(){
    gulp.src("./src/css/*.less")
        .pipe(less())
        .pipe(gulp.dest("./dist/css"))
        .pipe(connect.reload());
})
//监听
var watcher1 = gulp.watch("./src/index.html")
watcher1.on("change",gulp.parallel("html"));
var watcher2 = gulp.watch("./src/css/*.less")
watcher2.on("change",gulp.parallel("less"));
var watcher3 = gulp.watch("./src/js/*.js")
watcher3.on("change",gulp.parallel("js"));
//服务器
gulp.task("server",function(){
    connect.server({
        port:8081,
        livereload:true
    })
})

gulp.task("default",gulp.series("server","html","less","js"));

