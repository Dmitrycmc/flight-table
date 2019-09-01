export const concatArrays = arrays => arrays.reduce((acc, arr) => [...acc, ...arr], []);
export const mergeObjects = objects => objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});
