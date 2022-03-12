import svgSpriteGulp from 'gulp-svg-sprite';

export const svgSprite = () => {
    const { gulp, path, plugins } = app;
    const { src, build } = path;
    const { plumber, notify } = plugins;

    return gulp.src(src.svgIcons)
        .pipe(
            plumber(
                notify.onError({
                    title: 'SVG',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        .pipe(
            svgSpriteGulp({
                mode: {
                    stack: {
                        sprite: `../icons/icons.svg`,
                        example: true,
                    },
                },
            })
        )
        .pipe(
            gulp.dest(
                build.images
            )
        )
};