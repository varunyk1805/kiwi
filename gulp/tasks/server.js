export const server = () => {
    const { build } = app.path;
    const { browserSync } = app.plugins;

    browserSync.init({
        server: {
            baseDir: build.html,
        },
        notify: false,
        port: 5500,
    });
};