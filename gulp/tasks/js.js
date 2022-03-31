import webpackStream from "webpack-stream";

export const js = () => {
    const { gulp, path, plugins, isBuild, isDev } = app;
    const { src, build } = path;
    const { plumber, notify, browserSync } = plugins;

    return gulp.src(
            src.js,
            { sourcemaps: true }
        )
        .pipe(
            plumber(
                notify.onError({
                    title: 'JS',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        // .pipe(
        //     webpackStream({
        //         mode: isBuild ? 'production' : 'development',
        //         output: {filename: 'app.min.js'},
        //     })
        // )
        .pipe(
            webpackStream({
                mode: 'development',
                output: {
                    filename: 'app.min.js',
                },
            })
        )
        .pipe(
            gulp.dest(build.js)
        )
        .pipe(
            browserSync.stream()
        ); 
};