//сценарий собран при поддержке ролика по ссылке: https://youtu.be/stFOy0Noahg

let project_folder = require('path').basename(__dirname); //сюда выводится результат работы gulp
let source_folder = '_src'; //папка с исходниками

let fs = require('fs');

//содержит объекты содержащие путь к файлам и папкам
let path = {
   //пути вывода
   build: {
      html: project_folder + '/',
      css: project_folder + '/css/',
      js: project_folder + '/js/',
      img: project_folder + '/img/',
      fonts: project_folder + '/fonts/',
      php: project_folder + '/',
      modules: project_folder + '/modules/'
   },
   //пути входа
   src: {
      html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
      css: source_folder + '/scss/style.scss',
      js: source_folder + '/js/script.js',
      img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
      fonts: source_folder + '/fonts/*.ttf',
      php: source_folder + '/*.php',
      modules: source_folder + '/modules/**/*.*',
   },
   //пути к файлам, которые нужно "слушать"
   watch: {
      html: source_folder + '/**/*.html',
      css: source_folder + '/scss/**/*.scss',
      js: source_folder + '/js/**/*.js',
      img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
      fonts: source_folder + '/fonts/*.ttf',
      php: source_folder + '/*.php'
   },
   //путь к папке проекта, объект отвечает за удаление
   clean: './' + project_folder + '/'
}

//переменные, помогающие в написании сценария
let { src, dest } = require('gulp'),
   gulp = require('gulp'), //gulp
   browsersync = require('browser-sync').create(), //обновление в браузере
   del = require('del'), //удаление файлов
   scss = require('gulp-sass'), //sass, scss
   autoprefixer = require('gulp-autoprefixer'), //автопрефиксы для селекторов css
   group_media = require('gulp-group-css-media-queries'), //группировка медиазапросов и вынос в конец документа
   clean_css = require('gulp-clean-css'), //минимизация css файла
   rename = require('gulp-rename'), //переименовка файлов
   uglify = require('gulp-uglify-es').default, //минимизация js файлов
   imagemin = require('gulp-imagemin'), //пережимка изображений
   webp = require('gulp-webp'), //перекодировать изо в формат webp
   webphtml = require('gulp-webp-html'), //добавление тега для webp в html документ
   webpcss = require('gulp-webp-css'), // !!!возможен конфликт с normalize.!!! добавление селектора и класса для webp при работе с css документом
   ttf2woff = require('gulp-ttf2woff'), // конвертация ttf в woff
   ttf2woff2 = require('gulp-ttf2woff2'), // конвертация ttf в woff2
   fonter = require('gulp-fonter'), // конвертация otf в ttf
   fileinclude = require('gulp-file-include'); //связывание файлов, например @@include('_header.html')

function browserSync(params) {
   browsersync.init({
      server: {
         baseDir: './' + project_folder + '/'
      },
      port: 3000,
      notify: true //сообщение об обновлении браузера
   })
}

function clean(params) {
   return del(path.clean);
}

function html() {
   return src(path.src.html)
      .pipe(fileinclude())
      .pipe(webphtml())
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
}

function css() {
   return src(path.src.css)
      .pipe(
         scss({
            outputStyle: 'expanded'
         })
      )
      .pipe(group_media())
      .pipe(
         autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
         })
      )
      .pipe(webpcss())
      .pipe(dest(path.build.css))
      .pipe(clean_css())
      .pipe(
         rename({
            extname: '.min.css'
         })
      )
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
}

function js() {
   return src(path.src.js)
      .pipe(fileinclude())
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(
         rename({
            extname: '.min.js'
         })
      )
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
}

function images(params) {
   return src(path.src.img)
      .pipe(
         webp({
            quality: 70
         })
      )
      .pipe(dest(path.build.img))
      .pipe(src(path.src.img))
      .pipe(
         imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 // 0 to 7
         })
      )
      .pipe(dest(path.build.img))
      .pipe(browsersync.stream())
}

function fonts(params) {
   src(path.src.fonts)
      .pipe(ttf2woff())
      .pipe(dest(path.build.fonts));
   return src(path.src.fonts)
      .pipe(ttf2woff2())
      .pipe(dest(path.build.fonts));
}

function php() {
   return src(path.src.php)
      .pipe(dest(path.build.php))
      .pipe(browsersync.stream())
}

function modules() {
   return src(path.src.modules)
      .pipe(dest(path.build.modules))
      .pipe(browsersync.stream())
}

//вызов в терминале с помощью команды gulp otf2ttf
gulp.task('otf2ttf', function () {
   return src([source_folder + '/fonts/*.otf'])
      .pipe(
         fonter({
            formats: ['ttf']
         })
      )
      .pipe(dest(source_folder + '/fonts/'))
})

//
function fontsStyle(params) {
   let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
   if (file_content == '') {
      fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
      return fs.readdir(path.build.fonts, function (err, items) {
         if (items) {
            let c_fontname;
            for (var i = 0; i < items.length; i++) {
               let fontname = items[i].split('.');
               fontname = fontname[0];
               if (c_fontname != fontname) {
                  fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
               }
               c_fontname = fontname;
            }
         }
      })
   }
}
//callBack функция
function cb() {

}

//функция "прослушки"
function watchFiles(params) {
   gulp.watch([path.watch.html], html);
   gulp.watch([path.watch.css], css);
   gulp.watch([path.watch.js], js);
   gulp.watch([path.watch.img], images);
   gulp.watch([path.watch.php], php);
}

let build = gulp.series(clean, gulp.parallel(fonts, images, js, css, html, php, modules), fontsStyle, fonts);
let watch = gulp.parallel(build, watchFiles, browserSync);

//подружить переменные с gulp
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.php = php;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;