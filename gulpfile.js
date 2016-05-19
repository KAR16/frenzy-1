var gulp = require('gulp');
var w3cjs = require('gulp-w3cjs');

var browserSync = require('browser-sync');
var reload = browserSync.reload;




// Watch Files For Changes & Reload
gulp.task('serve', function () {
 browserSync({
   notify: false,
   // Customize the BrowserSync console logging prefix
   logPrefix: 'WSK',
   // Run as an https by uncommenting 'https: true'
   // Note: this uses an unsigned certificate which on first access
   //       will present a certificate warning in the browser.
   // https: true,
   server: ['.tmp', '.']
 });

 gulp.watch(['*.html'], reload);
 gulp.watch(['templates/**/*.html'], reload);
 gulp.watch(['styles/**/*.{scss,css}'], reload);
 gulp.watch(['js/**/*.js'], ['jshint']);
 gulp.watch(['img/**/*'], reload);
});

gulp.task('default', function() {
  gulp.start('htmllint', 'csslint');
});
