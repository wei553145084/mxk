//1 导入gulp这个第三方模块
const gulp = require('gulp');

//2.1 导入gulp-cssmin这个第三方模块
const cssmin = require('gulp-cssmin');

//2.2 导入gulp-autoprefixer这个第三方模块
const autoprefixer = require('gulp-autoprefixer');

//3.1 导入gulp-uglify这个第三方模块
const uglify = require('gulp-uglify');

//3.2 导入gulp-babel这个第三方模块
const babel = require('gulp-babel');

//4.1 导入gulp-htmlmin这个第三方模块
const htmlmin = require('gulp-htmlmin')

//7.1 导入del这个第三方模块
const del = require('del')

//9.1 导入gulp-webserver这个第三方模块
const webserver = require("gulp-webserver")

//10.1 导入sass这个第三方模块
const sass = require('gulp-sass');

//2.3 写一个打包css的方法
const cssHandler = ()=>{
    return gulp.src('./client/css/*.css')   //找到client目录里面下的css目录下的所有后缀为.css的文件
    .pipe(autoprefixer())           //把css代码自动添加前缀
    .pipe(cssmin())   //压缩css代码
    .pipe(gulp.dest('./dist/css'))  //压缩完毕以后的css代码放在dist目录中的css文件夹里面
}

//3.3 书写一个打包js的方法
const jsHanlder = ()=>{
    return gulp.src('./client/js/*.js')   //找到src目录里面下的js目录下的所有后缀为.js的文件
    .pipe(babel({
        presets: ['@babel/env']
    }))    //转码es6转换成es5了,就可以压缩了
    .pipe(uglify())  //压缩
    .pipe(gulp.dest('./dist/js'))  //把压缩完毕的放入文件夹
}

//4.2 书写一个打包html的方法
const htmlHandler = ()=>{
    return gulp.src(['./client/pages/*.html','./client/pages/*.htm'])   //找到src目录里面下的pages目录下的所有后缀为.html的文件
    .pipe(htmlmin({
        "removeAttributeQuotes":true,   //移除属性上的双引号
        "removeComments":true,    //移除注释
        "collapseBooleanAttributes":true,  //把值为布尔值的属性简写
        "collapseWhitespace":true, //移除所有空格,变成一行代码
        "minifyCSS":true, //把页面里面的style标签里面的css样式也去空格
        "minifyJS":true,  //把页面里面的script标签里面的js代码也去空格
    })) //压缩
    .pipe(gulp.dest('./dist/pages'))  //把压缩完毕的放到一个指定目录
}

//5.1 书写一个移动images文件夹的方法
const imgHandler = ()=>{
    return gulp.src('./client/images/**')  //images文件夹下的所有文档
    .pipe(gulp.dest('./dist/images'))   //放到指定的目录就可以了
}

//6.1 书写一个移动lib文件夹的方法
const libHandler = ()=>{
    return gulp.src('./client/lib/**')  //lib文件夹下的所有文档
    .pipe(gulp.dest('./dist/lib'))   //放到指定的目录就可以了
}

//7.2 书写一个任务,自动删除dist目录
const delHandler = ()=>{
    return del(['./dist'])
}

//8.1 自动监控文件
//监控client下面的文件,只要一修改,就执行对应的任务
const watchHandler = ()=>{
    
    gulp.watch('./client/css/*.css',cssHandler);
    gulp.watch('./client/js/*.js',jsHanlder);
    gulp.watch('./client/pages/*.html',htmlHandler);
    gulp.watch('./client/lib/**',libHandler);
    gulp.watch('./client/images/**',imgHandler)
}



//9 书写一个配置服务器的任务
// 在开发过程中直接把我写的代码在服务器上打开
// 因为要一边写一边修改,一边测试
// 因为gulp是基于node的
// 这里就使用node给我们开启一个服务器,不是apache,也不是nginx
// 自动刷新:当dist目录里面的代码改变以后,就会自动刷新浏览器

const serverHandler = ()=>{
    return gulp.src('./dist') //找到我要打开网页的文件夹,把这个文件夹当做网站根目录
    .pipe(webserver({//需要一些配置项
        port:'8080', //端口号,0-65535,尽量不使用0-1023
        open:'./mxk/client/pages/', //你默认打开的首页,从dist下面根目录开始书写
        livereload:true,//自动刷新浏览器,热重启
        //所有的代理配置都在proxies里面
        proxies:[
            //每一个代理配置就是一个对象
            {
                // source:"/weather",//源,你的代理标识符
                // target:'https://way.jd.com/jisuapi/weather',//目标,你要代理的地址
            }
        ]
    }))
}

//10.2 准备一个编译sass文件的函数
const sassHandler = ()=>{
    return gulp.src('./client/sass/*.scss','./client/sass/*.sass')   //找到所以要编译的sass文件
    .pipe(sass())    //把sass代码转换成css代码
    .pipe(autoprefixer())  //自动添加前缀(你可以做也可以不做)
    .pipe(cssmin())   //把已经转换好的css代码压缩 
    .pipe(gulp.dest('./dist/css'))  //放到指定目录
}

// 导出一个默认任务default,那么就不需要导出:css,js,html,img,lib,del,watch
// 执行任务的语法: gulp 任务名
// 如果任务名是default,执行任务的时候可以省略任务名
// 任务执行顺序: del->[css,js,html,img,lib]->watch
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler,jsHanlder,htmlHandler,imgHandler,libHandler),
    // serverHandler,
    // watchHandler
)