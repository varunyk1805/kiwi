import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
    const { gulp, path, plugins, isBuild } = app;
    const { src, build } = path;
    const { plumber, notify, newer, browserSync, ifGulp } = plugins;

    return gulp.src(src.images)
        .pipe(
            plumber(
                notify.onError({
                    title: 'IMAGES',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        .pipe(
            newer(
                build.images
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                webp()
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                gulp.dest(build.images)
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                gulp.src(src.images)
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                newer(build.images)
            )
        )
        .pipe(
            ifGulp(
            isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{removeViewBox: false}],
                    interlaced: true,
                    optimizationLevel: 3,
                })
            )
        )
        .pipe(
            gulp.dest(build.images))
        .pipe(
            gulp.src(src.svg)
        )
        .pipe(
            gulp.dest(build.images)
        )
        .pipe(
            browserSync.stream()
        ); 
};