import { mergeObjects } from './structures-utils';

export const buildState = dataObject => {
    const initialState = mergeObjects(Object.entries(dataObject).map(([field, { init }]) => ({ [field]: init })));

    const set = (state, field, value) => {
        state[field] = value;
        dataObject[field].callback(value);
        return true;
    };

    return new Proxy(initialState, { set });
};
