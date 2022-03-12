import del from 'del';
import zipGulp from 'gulp-zip';

export const zip = () => {
    const { gulp, path, plugins } = app;
    const { rootFolder, buildFolder } = path;
    const { plumber, notify, } = plugins;

    del(`./${rootFolder}.zip`);

    return gulp.src(`${buildFolder}/**/*.*`)
        .pipe(
            plumber(
                notify.onError({
                    title: 'ZIP',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        .pipe(
            zipGulp(
                `${rootFolder}.zip`
            )
        )
        .pipe(
            gulp.dest(
                './'
            )
        )
};