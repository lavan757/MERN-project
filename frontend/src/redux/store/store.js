import { configureStore } from '@reduxjs/toolkit'

const user = require('../state/userSlice').default;

const reducer = {
    user,
};

const store = configureStore({
    reducer,
    devTools: true,
});

export default store;
