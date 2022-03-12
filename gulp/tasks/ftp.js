import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
    const { gulp, path, plugins } = app;
    const { rootFolder, buildFolder, ftp } = path;
    const { plumber, notify, } = plugins;

    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);

    return gulp.src(`${buildFolder}/**/*.*`)
        .pipe(
            plumber(
                notify.onError({
                    title: 'FTP',
                    message: 'Error: <%= error.message %>'
                })
            )
        )
        .pipe(
            ftpConnect.dest(
                `/${ftp}/${rootFolder}`
            )
        )
};