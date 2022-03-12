import del from 'del';

export const reset = () => {
    const { buildFolder } = app.path;

    return del(buildFolder);
};