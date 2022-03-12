import replace from 'gulp-replace'; //Заміна
import plumber from 'gulp-plumber'; //Обробка помилок
import notify from 'gulp-notify'; // Повідомлення
import browserSync from 'browser-sync'; //Локальний браузер
import newer from 'gulp-newer'; //Перевірка оновлення
import ifGulp from 'gulp-if'; //Умова відгалуження

export const plugins = {
    replace,
    plumber,
    notify,
    browserSync,
    newer,
    ifGulp,
};