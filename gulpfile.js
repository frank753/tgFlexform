/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var pump = require('pump');
var path = require('path');
var del = require('del');
var gulp = require('gulp');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var recursiveFolder = require('gulp-recursive-folder');
var zip = require('gulp-zip');

var packageJSON = require('./package.json');
var packageName = packageJSON.name;
var packageVersion = packageJSON.version;

var pluginOptions = 
	{
    src: 'src',
	bundleSrc:"embed",
    target: 'dist',
    targetMin: 'minified',
	exclude:[],
	tmp:"tmp"
	};

gulp.task('clean:dist', function () 
	{
	return del(	[
				'dist/*'
				]);
	});

gulp.task('cleanAfterBuild', function () 
	{
	return del(	[
				pluginOptions.tmp
				]);
	});
 
gulp.task('minify:jqueryPlugin', recursiveFolder(
												{
												base: pluginOptions.src,
												exclude: pluginOptions.exclude
												},
												function(folderFound)
													{
													return gulp.src([folderFound.path + "/jquery.*.js", pluginOptions.bundleSrc+ "/*.js"])
														.pipe(uglify())
														.pipe(concat(folderFound.name + ".js"))
														.pipe(gulp.dest(pluginOptions.tmp + "/" + folderFound.pathTarget));
													}
												));
gulp.task('minify:jqueryPluginAddsJS', recursiveFolder(
												{
												base: pluginOptions.src,
												exclude: pluginOptions.exclude
												},
												function(folderFound)
													{
													return gulp.src([folderFound.path + "/*.js","!"+folderFound.path + "/jquery*.js" ])
														.pipe(uglify())
														.pipe(gulp.dest(pluginOptions.tmp + "/" + folderFound.pathTarget));
													}
												));
gulp.task('copy:jqueryPluginAdds', recursiveFolder(
												{
												base: pluginOptions.src,
												exclude: pluginOptions.exclude
												},
												function(folderFound)
													{
													return gulp.src([folderFound.path + "/*", "!"+folderFound.path + "/*.js" ])
														.pipe(gulp.dest(pluginOptions.tmp + "/" + folderFound.pathTarget));
													}
												));
gulp.task('copy:Files', function()
							{
							return gulp.src(["./README*", "./LICENSE*" ])
										.pipe(gulp.dest(pluginOptions.tmp));
							});
gulp.task('zip', () =>
    gulp.src(pluginOptions.tmp+'/**')
        .pipe(zip(packageName+'-'+packageVersion+'-min.zip'))
        .pipe(gulp.dest(pluginOptions.target))
);										

gulp.task('default', gulp.series('clean:dist',gulp.parallel("minify:jqueryPlugin", 'minify:jqueryPluginAddsJS', 'copy:jqueryPluginAdds', 'copy:Files'), "zip", "cleanAfterBuild"
		
		));

