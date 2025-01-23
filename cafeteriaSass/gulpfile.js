const { src, dest, watch, series, parallel } = require("gulp");
const sass = require ('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss')
const autoprefixer  = require('autoprefixer')


function css(done) {
 //compilar sass
 //pasos: 1 - identificar archivo, 2 - Compilarla, 3 - Guardar el .css
 src('src/scss/app.scss')
   .pipe(sass())
   .pipe(sass({outputStyle: 'compressed'})) // con esto le decimos que queremos que el css nos lo haga comprimido, que ocupe lo mínimo
   .pipe(postcss([autoprefixer()])) // para dar soporte a navegadores antiguos que he tenido que especificar en el package.json
   .pipe(dest('build/css')) // este es el archivo que debe compilar
   done();
}

function imagenes() {
  return src("src/img/**/*") 
  .pipe(dest("build/img"));
 }

function dev(){
 watch('src/scss/**/*.scss',css) // atento a cambios del archivo app.scss y si cambia vuelve a llamar a la función css
 watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.imagenes = imagenes;
exports.default = series(imagenes, css, dev);