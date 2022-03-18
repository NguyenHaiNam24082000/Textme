import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        editMessage: (state, action) => {
            state.messages = state.messages.map((message) => {
                if (message._id === action.payload._id) {
                    return action.payload;
                }
                return message;
            });
        },
        removeMessage: (state, action) => {
            state.messages = state.messages.filter((message) => message._id !== action.payload);
        },
    },
    extraReducers: {
        [addMessage.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addMessage.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.messages.push(action.payload);
        },
        [addMessage.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default slice.reducer;
export const { addMessage, editMessage, removeMessage } = slice.actions;