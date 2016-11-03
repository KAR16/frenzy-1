var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var run = require('gulp-run');
var fs = require('fs');
var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
gulp.task('ionic-hooks' , function () {
   return run('ionic hooks add').exec()
});
gulp.task('ionic-android', ['ionic-hooks'], function() {
   return run('ionic platform add android').exec()
});
gulp.task('ionic-resources' , ['ionic-android'],function () {
  return run ('ionic resources').exec()
});
gulp.task('create-signing-propieties',['ionic-resources'], function(cb){
  //  Enter passphrase for keystore:
  var storePassword ='';
  //  Enter key password for mykey
  var keyPassword = '';
  var config = 'storeFile=build/outputs/apk/my.keystore\nkeyAlias=mykey\nstorePassword=' + storePassword + '\nkeyPassword='+keyPassword ;
  fs.writeFile('platforms/android/release-signing.properties', config, cb);
});
gulp.task('cordova-build', ['create-signing-propieties'],function () {
  return run ('cordova build -release android').exec();
});
gulp.task('zipalign' ,['cordova-build'],function () {
  var pathZipalign = '';
  var pathApk = '';
  return run(pathZipalign + ' -v 4 ' + pathApk + '/android-release-unaligned.apk frenzy.apk' ).exec();
});
gulp.task('deploy-android', ['ionic-hooks', 'ionic-android','ionic-resources','create-signing-propieties','cordova-build','zipalign']);
