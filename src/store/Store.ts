
import {configureStore} from '@reduxjs/toolkit';
import themeReducer from "../slice/ThemeSlice";
import basketReducer from "../slice/BasketSlice";

export const store = configureStore({
    reducer : {
        themes: themeReducer,
        basket: basketReducer,
    }
})
