// Основний модуль
import gulp from 'gulp';

// Імпорт шляхів
import { path } from './gulp/config/path.js';

// Імпорт загальних плагінів
import { plugins } from './gulp/config/plugins.js';

// Імпорт задач
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { server } from './gulp/tasks/server.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprite } from './gulp/tasks/svgSprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';

// Глобальна змінна
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path,
    gulp,
    plugins,
};

// Спостерігач за змінами у файлах
const watcher = () => {
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
};

// Послідовна обробка шрифтів
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Основні задачі
const mainTasks = gulp.series(fonts, gulp.parallel(html, scss, js, images, svgSprite));

// Побудова сценаріїв виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

// Експорт сценаріїв
export { dev, build, deployZIP, deployFTP, svgSprite };

// Виконання сценарію за замовчуванням
gulp.task('default', dev);