// const initialState = { count: 0 }

// const ACTIONS = {
//     INCREMENT: "INCREMENT",
//     DECREMENT: "DECREMENT"
// };

// export const increment = () => ({
//     type: ACTIONS.INCREMENT,
//     payload: 1
// });

// export const decrement = () => ({
//     type: ACTIONS.DECREMENT,
//     payload: 1
// });


// const countReducer = (state = initialState, action) => {
//     const { type, payload } = action;

//     switch (type) {
//         case ACTIONS.INCREMENT:
//             return { ...state, count: state.count + payload };
//         case ACTIONS.DECREMENT:
//             return { ...state, count: state.count - payload }
//         default:
//             return state;
//     }
// }

// export default countReducer


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock API call that resolves after 2 seconds
const fetchIncrementValue = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(5); // Mock payload value from server
        }, 2000);
    });
};

// Async thunk action
export const incrementAsync = createAsyncThunk(
    'count/incrementAsync',
    async () => {
        const value = await fetchIncrementValue();
        return value;
    }
);

const initialState = { count: 0, loading: false };

const countSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload || 1;
        },
        decrement: (state, action) => {
            state.count -= action.payload || 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(incrementAsync.fulfilled, (state, action) => {
                state.count += action.payload;
                state.loading = false;
            })
            .addCase(incrementAsync.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;