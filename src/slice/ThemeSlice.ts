import { createSlice } from '@reduxjs/toolkit';
import { ThemeState } from '../global/Types';

const initialState = { value: true } as ThemeState;

const themeSlice = createSlice({
    name: 'Theme',
    initialState,
    reducers: {
        setTheme: (state) => {
            state.value = !state.value;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;