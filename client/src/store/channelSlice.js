import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "channel",
    initialState: {
        channels: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        addChannel: (state, action) => {
            state.channels.push(action.payload);
        },
        editChannel: (state, action) => {
            state.channels = state.channels.map((channel) => {
                if (channel._id === action.payload._id) {
                    return action.payload;
                }
                return channel;
            });
        },
        removeChannel: (state, action) => {
            state.channels = state.channels.filter((channel) => channel._id !== action.payload);
        },
    },
    extraReducers: {
        [addChannel.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addChannel.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.channels.push(action.payload);
        },
        [addChannel.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default slice.reducer;
export const { addChannel, editChannel, removeChannel } = slice.actions;