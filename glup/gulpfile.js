const gulp = require('gulp')
const cleanCss = require('gulp-clean-css') //引入css压缩模块
const postcss = require('gulp-postcss');
const pxtoviewport = require("postcss-px-to-viewport")
const less = require('gulp-less') // 引入less css解析器
const htmlmin = require('gulp-htmlmin') //压缩 html
const fileinclude = require('gulp-file-include') // 模块化
const autoprefixer = require('gulp-autoprefixer') //引入加前缀模块
const babel = require('gulp-babel') //引入es6转es5模块
const uglify = require('gulp-uglify') //引入js压缩模块
const imagemin = require('gulp-imagemin') // 压缩img
const clean = require('gulp-clean') // 清除文件
const connect = require("gulp-connect") //热加载

const path = {
  dest: 'dist',
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  css: {
    src: 'src/**/*.{css,less}',
    dest: 'dist'
  },
  js: {
    src: 'src/**/*.js',
    dest: 'dist'
  },
  fonts: {
    src: 'src/**/*.ttf',
    dest: 'dist'
  },
  image: {
    src: 'src/**/*.{png,jpg,gif,ico}',
    dest: 'dist'
  }
}

const vw_config  = {
	unitToConvert: 'px',  // 要转换的单位，默认情况下是px
	viewportWidth: 750, // 视口的宽度
	unitPrecision: 5, 
	propList: ['*'],
	viewportUnit: 'vw',
	fontViewportUnit: 'vw',
	selectorBlackList: [],
	minPixelValue: 1,
	mediaQuery: false,
	replace: true,
	exclude: []
}



// 处理 css
const css = () => {
	const processors = [pxtoviewport({
    viewportWidth: 375,
    viewportUnit: 'vw'
  })]
  return gulp.src(path.css.src)
		.pipe(less())
		.pipe(postcss(processors))
		.pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest(path.css.dest))
    .pipe(connect.reload())
}

// 处理 html
const html = () => {
  /*一个*表示所有文件，两个*表示所有目录*/
  return gulp.src(path.html.src) //打开读取文件
    .pipe(fileinclude({
      prefix: '@@',//变量前缀 @@include
      basepath: './src/_include',//引用文件路径
      indent: true//保留文件的缩进
    }))
    .pipe(htmlmin({
      removeComments: true, //清除HTML注释
      collapseWhitespace: true, //压缩HTML
      collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
      removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: false, //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
      minifyJS: true, //压缩页面JS
      minifyCSS: true //压缩页面CSS
    })) //管道流操作，压缩文件
    .pipe(gulp.dest(path.html.dest)) //指定压缩文件放置的目录
    .pipe(connect.reload())
}

// 处理 js
const js = () => {
  gulp.src(path.js.src)
    .pipe(babel({
      presets: ['@babel/env'] //es6转es5
    }))
    .pipe(uglify()) //执行压缩
    .pipe(gulp.dest(path.js.dest))
    .pipe(connect.reload())
}

// 处理 image
const image = () => {
  gulp.src(path.image.src)
    // .pipe(imagemin({
    //   optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
    //   progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
    //   interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
    //   multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
    // })) //执行压缩
    .pipe(gulp.dest(path.image.dest))
    .pipe(connect.reload())
}

// 处理 fonts
const fonts = () => {
  gulp.src(path.fonts.src)
    .pipe(gulp.dest(path.fonts.dest))
    .pipe(connect.reload())
}

// 清空文件夹
const clear = () => {
  return gulp.src(path.dest)
    .pipe(clean())
}

// 本地服务
const server = () => {
  connect.server({ //创建服务器
    root: 'dist',//根目录
    port: '3000',//端口号
    livereload: true//服务器热更新
  })
}

//监听文件，文件改变执行对应的任务
const watch = () => {
  gulp.watch(path.html.src, html)
  gulp.watch(path.css.src, css)
  gulp.watch(path.js.src, js)
}

module.exports = {
  html,
  js,
  css,
  image,
  fonts,
  watch,
  clear,
  server
}

module.exports.default = gulp.series(gulp.parallel(html, js, css, fonts, image, watch, server))
