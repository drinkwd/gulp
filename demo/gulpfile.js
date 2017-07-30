var gulp=require('gulp');
//压缩css文件
var cssmin=require('gulp-minify-css');
//给路径后面加上一个版本号防止浏览器访问缓存
var cssver=require('gulp-make-css-url-version');
//合并js文件
var jsconcat=require('gulp-concat');
//压缩js文件
var jsuglify=require('gulp-uglify');

/*
压缩一个css文档
gulp.task("Cssmin",function () {
//找到想压缩的文件路径
    gulp.src('src/css/base.css')
   //开始进行压缩
        .pipe(cssmin())
        //输出到指定的文件夹
        .pipe(gulp.dest('dist'));
})*/
//压缩多个css文档
gulp.task("Cssmin",function () {
    //gulp.src(['src/css/base.css','src/css/index.css'])
        gulp.src('src/**/*.css')
            .pipe(cssver())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/'));
});
//压缩合并css文档
gulp.task("Cssconcatmin",function () {
        gulp.src("src/**/*.css")
            .pipe(cssver())
            .pipe(jsconcat('build.css'))
            .pipe(cssmin())
            .pipe(gulp.dest('dist/css'));
})
//js合并
gulp.task("Jsconcat",function () {
        gulp.src("src/js/*.js")
            .pipe(jsconcat('build.js'))
            .pipe(gulp.dest('dist/js'));
})
//js压缩
gulp.task("Jsuglify",function () {
        gulp.src(['src/js/index1.js','src/js/index2.js'])
            .pipe(jsuglify())
        .pipe(gulp.dest('dist/js'));
});
//js压缩的时候是否混淆变量名或函数名
gulp.task("Jsuglify2",function () {
        gulp.src(['src/js/index1.js','src/js/index2.js'])
            .pipe(jsuglify({
                    //mangle:false全部不混淆默认是true
                    mangle:{expect:['require','exports','modules','$']},//排除关键字混淆
                    compress:true,//是否完全压缩默认是true
                    preserveComments:'all'//是否保留注释
            }))
            .pipe(gulp.dest('dist/js'));
});
//拷贝文件
gulp.task("copy",function () {
    gulp.src('src/**/*.*')
        .pipe(gulp.dest('dist/'));
});
//默认执行
gulp.task('default',function () {
    console.log('这是默认任务');
    //当src目录下的文件发生变化时，自动执行后面的任务
    gulp.watch('src/**/*.*',['copy'])
})