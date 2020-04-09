var gulp = require("gulp");
var plumber = require("gulp-plumber");
var inject = require("gulp-inject");
var postCss = require("gulp-postcss");
var browserSync = require("browser-sync");
var pug = require("gulp-pug");
var del = require('del');

var server = browserSync.create();

var paths = {
	development: "./build/",
	production: "./dist/"
}

function getPath() {
	return process.env.NODE_ENV === "production" ? paths.production : paths.development;
}

var path = getPath();

function clearBuildFolder() {
	return del(['./dist/**', '!./dist/'], {dryRun: false});
}

// BrowserSync
function serve(done) {
	server.init({
		server: {
			baseDir: paths.development,
		},
		open: false,
	});
	done();
}

function reloadServer(cb) {
	// server.reload({ stream: true })
	server.reload()
	cb()
}

//JS
// function js() {
//     return new Promise(resolve =>
//         webpack(webpackConfig, (err, stats) => {
//             if (err) console.log("Webpack", err);
//             console.log(stats.toString());
//             resolve();
//         })
//     );
// }

//Move assets
var filesToMove = ["./src/images/**/*.*"];

function moveAssets() {
	return gulp
		.src(filesToMove, { base: "./src/" })
		.pipe(gulp.dest(path));
}

//CSS
function css() {
	return gulp
		.src("./src/css/style.css")
		.pipe(postCss())
		.pipe(gulp.dest(path));
}

//PUG
function html() {
	return gulp
		.src(["./src/pug/*.pug"])
		.pipe(
			plumber({
				errorHandler: (error) => console.log(error),
			})
		)
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(gulp.dest(path));
}

//Inject
function assemble() {
	return gulp
		.src(path + "**/*.html")
		.pipe(
			inject(
				gulp.src(["./build/**/*.css", "./build/**/*.js"], {
					read: false,
				}),
				{
					relative: true,
					// ignorePath: "build",
					// addRootSlash: false,
					// name: "styles"
				}
			)
		)
		.pipe(gulp.dest(path))
}

//Watch
function watchFiles() {
	gulp.watch(["./src/css/**/*.css"], gulp.series(moveAssets, css, assemble, reloadServer));
	gulp.watch(
		"./src/pug/**/*.pug",
		gulp.series(moveAssets, html, css, assemble, reloadServer)
	);
	//gulp.watch("./src/js/**/*.js", gulp.series(js, assemble));
}

exports.default = gulp.series(
	serve,
	moveAssets,
	html,
	css,
	assemble,
	watchFiles
);

exports.build = gulp.series(clearBuildFolder, moveAssets, html, css, assemble);
