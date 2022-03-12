import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    const { gulp, path, plugins } = app;
    const { srcFolder } = path;
    const { plumber, notify } = plugins;
    
    return gulp.src(`${srcFolder}/fonts/*.otf`)
        .pipe(
            plumber(
                notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            fonter({
                formats: ['ttf'],
            })
        )
        .pipe(
            gulp.dest(
                `${srcFolder}/fonts/`
            )
        )
};

export const ttfToWoff = () => {
    const { gulp, path, plugins } = app;
    const { srcFolder, build } = path;
    const { plumber, notify } = plugins;

    return gulp.src(`${srcFolder}/fonts/*.ttf`)
        .pipe(
            plumber(
                notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            fonter({
                formats: ['woff'],
            })
        )
        .pipe(
            gulp.dest(
                `${build.fonts}`
            )
        )
        .pipe(
            gulp.src(
                `${srcFolder}/fonts/*.ttf`
            )
        )
        .pipe(
            ttf2woff2()
        )
        .pipe(
            gulp.dest(
                `${build.fonts}`
            )
        )
};

export const fontsStyle = () => {
    const { gulp, path } = app;
    const { srcFolder, build } = path;
    const fontsFile = `${srcFolder}/scss/fonts.scss`;
    const cb = () => { };
    const createFonts = (err, fontsFiles) => {
        if (!fontsFiles) return;
        if (fs.existsSync(fontsFile)) {
            console.log('Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить');
            return;
        };
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i += 1) {
            let fontsFileName = fontsFiles[i].split('.')[0];
            if (newFileOnly !== fontsFileName) {
                let fontName = fontsFileName.split('-')[0] ? fontsFileName.split('-')[0] : fontsFileName;
                let fontWeight = fontsFileName.split('-')[1] ? fontsFileName.split('-')[1] : fontsFileName;
                switch (fontWeight.toLocaleLowerCase()) {
                    case 'thin':
                        fontWeight = 100;
                        break;
                    
                    case 'hairline':
                        fontWeight = 100;
                        break;
                    
                    case 'extralight':
                        fontWeight = 200;
                        break;
                    
                    case 'ultralight':
                        fontWeight = 200;
                        break;
                    
                    case 'light':
                        fontWeight = 300;
                        break;
                
                    case 'medium':
                        fontWeight = 500;
                        break;
                    
                    case 'semibold':
                        fontWeight = 600;
                        break;
                    
                    case 'demibold':
                        fontWeight = 600;
                        break;
                
                    case 'bold':
                        fontWeight = 700;
                        break;
                    
                    case 'extrabold':
                        fontWeight = 800;
                        break;
                    
                    case 'ultrabold':
                        fontWeight = 800;
                        break;
                    
                    case 'black':
                        fontWeight = 900;
                        break;
                    
                    case 'heavy':
                        fontWeight = 900;
                        break;
                    
                    default:
                        fontWeight = 400;
                };
                fs.appendFile(
                    fontsFile,
                    `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontsFileName}.woff2") format("woff2"), url("../fonts/${fontsFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\r\n}\r\n`,
                    cb
                );
                newFileOnly = fontsFileName;
            }
        };
    };

    fs.readdir(build.fonts, createFonts);

    return gulp.src(`${srcFolder}`);
};