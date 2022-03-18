import * as nodePath from 'path';

const ROOT_FOLDER = nodePath.basename(nodePath.resolve());
const BUILD_FOLDER = './dist';
const SRC_FOLDER = './src';

export const path = {
    build: {
        html: `${BUILD_FOLDER}/`,
        css: `${BUILD_FOLDER}/css/`,
        js: `${BUILD_FOLDER}/js/`,
        images: `${BUILD_FOLDER}/img/`,
        fonts: `${BUILD_FOLDER}/fonts/`,
    },
    src: {
        html: `${SRC_FOLDER}/*.html`,
        scss: `${SRC_FOLDER}/scss/styles.scss`,        
        js: `${SRC_FOLDER}/js/app.js`,        
        images: `${SRC_FOLDER}/img/**/*.{jpg,jpeg,png,gif,webp}`,        
        svg: `${SRC_FOLDER}/img/**/*.svg`,        
        svgIcons: `${SRC_FOLDER}/svgIcons/*.svg`,        
    },
    watch: {
        html: `${SRC_FOLDER}/**/*.html`,
        scss: `${SRC_FOLDER}/scss/**/*.scss`,
        js: `${SRC_FOLDER}/js/**/*.js`,
        images: `${SRC_FOLDER}/img/**/*.{jpg,jpeg,png,gif,webp}`,        
    },
    buildFolder: BUILD_FOLDER,
    srcFolder: SRC_FOLDER,
    rootFolder: ROOT_FOLDER,
    ftp: 'test',
};