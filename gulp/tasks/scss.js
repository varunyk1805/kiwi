import sassDart from 'sass';
import sassGulp from 'gulp-sass';
import rename from 'gulp-rename'; //перейменування із .scss на .min.css
import cleanCSS from 'gulp-clean-css'; //мінімізація .css
import webpCSS from 'gulp-webpcss'; //вивід .webp-зображень
import autoPrefixer from 'gulp-autoprefixer'; // автододавання вендорних префіксів
import groupMediaQueries from 'gulp-group-css-media-queries'; //групування медіа запитів 

const sass = sassGulp(sassDart);

export const scss = () => {
    const { gulp, path, plugins, isBuild, isDev } = app;
    const { src, build } = path;
    const { plumber, notify, replace, browserSync, ifGulp } = plugins;

    return gulp.src(
            src.scss,
            { sourcemaps: true }
        )
        .pipe(
            plumber(
                notify.onError({
                    title: 'SCSS',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        .pipe(
            replace(
                /@img\//g,
                '../img/'
            )
        )
        .pipe(
            sass({
                outputStyle: 'expanded',
            })
        )
        .pipe(
            groupMediaQueries()
        )
        .pipe(
            webpCSS({
                webpClass: '.webp',
                noWebpClass: '.no-webp',
            })
        )
        .pipe(
            autoPrefixer({
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true,
            })
        )
        .pipe(
            gulp.dest(
                build.css
            )
        )
        .pipe(
            cleanCSS()
        )
        .pipe(
            rename({
                extname: '.min.css',
            })
        )
        .pipe(
            gulp.dest(
                build.css)
        )
        .pipe(
            browserSync.stream()
        ); 
    
    return gulp.src(
            src.scss,
            { sourcemaps: isDev }
        )
        .pipe(
            plumber(
                notify.onError({
                    title: 'SCSS',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        .pipe(
            replace(
                /@img\//g,
                '../img/'
            )
        )
        .pipe(
            sass({
                outputStyle: 'expanded',
            })
        )
        .pipe(
            ifGulp(
                isBuild,
                groupMediaQueries()
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                webpCSS({
                    webpClass: '.webp',
                    noWebpClass: '.no-webp',
                })
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                autoPrefixer({
                    grid: true,
                    overrideBrowserslist: ["last 3 versions"],
                    cascade: true,
                })
            )
        )
        .pipe(
            gulp.dest(
                build.css
            )
        )
        .pipe(
            ifGulp(
                isBuild,
                cleanCSS()
            )
        )
        .pipe(
            rename({
                extname: '.min.css',
            })
        )
        .pipe(
            gulp.dest(
                build.css)
        )
        .pipe(
            browserSync.stream()
        ); 
};