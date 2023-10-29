import { initialState } from '@/utils/Context';
import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        add: (state, action) => {

            if (!Array.isArray(action.payload) || action.payload.length < 2) return state;

            return state.map((item) => {
                if (item.id !== action.payload[0].id) {
                    return item;
                }
                return {
                    ...item,
                    amount: action.payload[1],
                    added: true
                };
            });
        },
        remove: (state, action) => {
            return state.map(item => {
                if (item.id !== action.payload.id) {
                    return item;
                }
                return {
                    ...item,
                    amount: 0,
                    added: false
                };
            });
        },
        clearBasket: (state) => {
            return state.map(item => ({
                ...item,
                amount: 0,
                added: false
            }));
        }
    }
})

export const { add, remove, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;