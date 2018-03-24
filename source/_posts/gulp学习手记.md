---
title: gulp学习手记
date: 2017-06-30 22:23:54
tags: gulp
---

## 创建目录 初始化
```
npm init -y
```
> 注意，package.json 中的name 不能为 gulp

## 安装 gulp
```
npm install gulp-cli -g
npm install gulp -D //-D相当于 --save-dev
```
## 创建配置文件
```
touch gulpfile.js
```


## 安装所需要的插件

```
npm install gulp-concat gulp-uglify gulp-rename gulp-htmlmin del copy --save-dev 

npm install gulp-jshint --save-dev          //js脚本检查
npm install gulp-uglify --save-dev          //js压缩插件
npm install gulp-concat --save-dev          //js合并插件
npm install gulp-order  --save-dev          //js合并顺序控制插件

npm install gulp-cssnano --save-dev         //css压缩插件
npm install gulp-sass --save-dev            //编译sass
npm install gulp-less --save-dev            //less文件编译 

npm install gulp-htmlmin --save-dev         //html压缩插件
npm install gulp-html-replace --save-dev    //html文件对合并文件后的替换处理插件

npm install gulp-imagemin --save-dev        //图片压缩插件


npm install del --save-dev                  //文件删除模块
npm install copy --save-dev                  //文件拷贝模块
```

## 插件配置

插件配置之前要先在 gulpfile.js 中 用 require 引入
```
plugin = require('gulp-plugin');

```

### 插件配置

del 清除旧部署文件
```
gulp.task('clean', function (cb) {
    del(['dest/*']);
    cb();
});
```
---

copy 拷贝 图标、字体、第三方已压缩文件
```
gulp.task('copy', function (cb) {
    copy('favicon.ico', 'dest/');
    cb();
});
```
---

uglify concat 压缩 js 文件（包括合并操作， 多个js文件压缩成一个文件）

```javascript
gulp.task('uglifyjs', function () {
    // 1. 找到文件
    gulp.src(['datas/*.js'])
    // 2. 压缩文件
    .pipe(uglify())
    // 3. 合并成一个文件
    .pipe(concat('datas.js'))
    // 4. 另存压缩后的文件
    .pipe(gulp.dest('dest/datas/'));
});
```
---

less/sass cssnano 编译并压缩 css 文件
```
gulp.task('cssmin', function () {
    // 1. 找到文件 如果为less sass请注意文件名
    gulp.src('css/main.css')
    // 2. 编译css
    .pipe(less())
    // 3. 压缩文件
     .pipe(cssnano())
    // 4. 另存为压缩文件
    .pipe(gulp.dest('dest/css/'))
});
```
---

htmlmin html压缩插件

html-replace html外链替换插件
> 在html 中替换 调用的 js代码，以及压缩html（例如， a.html 调用了 a.js b.js， 然后 a.js b.js在第3步或第5步被合并成 c.min.js ;  这部分作用就是自动将a.html中改成调用 c.min.js ）。


```
gulp.task('htmlmin', function () {
    var options = {
        collapseWhitespace: true, //压缩HTML
        //省略布尔属性的值 <input checked="true"/> ==> <input />
        collapseBooleanAttributes: false,
        //删除所有空格作属性值 <input id="" /> ==> <input />
        removeEmptyAttributes: true,
        //删除<script>的type="text/javascript"
        removeScriptTypeAttributes: true,
        //删除<style>和<link>的type="text/css"
        removeStyleLinkTypeAttributes: true,
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    gulp.src('index.html')
        .pipe(htmlReplace({
            'datasjs': 'datas/datas.js',
            'mainjs': 'js/main.js'
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dest/'));
});
```

> 将多个js或css 替换成单个

html 替换前
```javascript
<!-- build:css -->
<link rel="stylesheet" href="css/common.css">
<link rel="stylesheet" href="css/floatlayer.css">
<!-- endbuild -->

<!-- build:js -->
<script src="js/base.js"></script>
<script src="js/app_boot.js"></script>
<script src="js/app_loader.js"></script>
<!-- endbuild -->
```
gulpfile.js
```
gulp.src('src/index.html')
.pipe(htmlreplace({
'css': 'css/main.css',
'js': 'js/main.js'
}))
```
html 替换后
```
<link rel="stylesheet" href="css/main.css">

<script src="js/main.js"></script>

```
---

imagemin 压缩图片
```
gulp.task('imagemin', function () {
    // 1. 找到图片
    gulp.src('images/**/*.{png,jpg,jpeg,gif,webp,svg}')
        // 2. 压缩图片
        .pipe(imagemin({
            progressive: true
        }))
        // 3. 另存图片
        .pipe(gulp.dest('dest/images'))
});
```
---
gulp-order js合并顺序控制

```
gulp
  .src("**/*.coffee")
  .pipe(coffee())
  .pipe(gulp.src("**/*.js")) // gulp.src passes through input
  .pipe(order([
    "vendor/js1.js",
    "vendor/**/*.js",
    "app/coffee1.js",
    "app/**/*.js"
  ]))
  .pipe(concat("all.js"))
  .pipe(gulp.dest("dist"));
```


## 浏览器同步刷新

```
npm install browser-sync  --save -dev
```
配置
```
var gulp = require('gulp');                        //获取gulp
var browsersync = require('browser-sync').create();//获取browsersync

//删除dist目录下文件
var del=require('del');
gulp.task('clean',function(cb){
    return del(['dist/*'],cb);
})

//操作js文件
var uglify = require('gulp-uglify');               //js压缩插件
var concat = require('gulp-concat');               //js合并插件
gulp.task('scripts', function() {
    gulp.src('js/*.js')               //需要操作的源文件
        .pipe(uglify())               //压缩js文件
        .pipe(concat('app.js'))       //把js文件合并成app.js文件
        .pipe(gulp.dest('dist/js'))   //把操作好的文件放到dist/js目录下
        .pipe(browsersync.stream());  //文件有更新自动执行
});

//操作css文件
var cssnano = require('gulp-cssnano');    //css压缩插件
var less=require('gulp-less')             //less文件编译
gulp.task('style', function() {
    gulp.src('style/*.css')
        .pipe(less())                     //编译less文件
        .pipe(cssnano())                  //css压缩
        .pipe(gulp.dest('dist/style'))
        .pipe(browsersync.stream());
});

var imagemin = require('gulp-imagemin');    //图片压缩插件
gulp.task('image', function() {
    gulp.src('images/*.{png,jpg,jpeg,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browsersync.stream());
});

var htmlmin = require('gulp-htmlmin');      //html压缩插件
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,            //压缩html
            collapseBooleanAttributes: true,     //省略布尔属性的值
            removeComments: true,                //清除html注释
            removeEmptyAttributes: true,         //删除所有空格作为属性值
            removeScriptTypeAttributes: true,    //删除type=text/javascript
            removeStyleLinkTypeAttributes: true, //删除type=text/css
            minifyJS:true,                       //压缩页面js
            minifyCSS:true                       //压缩页面css
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browsersync.stream());
});

gulp.task('serve', ['clean'], function() {
    gulp.start('scripts','style','image','html');
    browsersync.init({
        port: 2016,
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch('js/*.js', ['scripts']);         //监控文件变化，自动更新
    gulp.watch('style/*.css', ['style']);
    gulp.watch('images/*.*', ['image']);
    gulp.watch('*.html', ['html']);
});

gulp.task('default',['serve']);
```