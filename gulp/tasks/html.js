import fileInclude from 'gulp-file-include';
import webpHtmlNoSVG from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';

export const html = () => {
    const { gulp, path, plugins, isBuild } = app;
    const { src, build } = path;
    const { plumber, notify, replace, browserSync, ifGulp } = plugins;

    return gulp.src(src.html)
        .pipe(
            fileInclude()
        )
        .pipe(
            plumber(
                notify.onError({
                    title: 'HTML',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        .pipe(
            replace(
                /@img\//g,
                'img/'
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                webpHtmlNoSVG()
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': ['css', 'js']
                    },
                    'output': {
                        'file': 'gulp/version.json',
                    },
                })
            )
        )
        .pipe(
            gulp.dest(
                build.html
            )
        )
        .pipe(
            browserSync.stream()
        ); 
};