import { createSlice } from "@reduxjs/toolkit";
import {
  PendingRequests,
  OutGoingRequests,
  AllFriends,
} from "../reactQuery/friend";

const slice = createSlice({
  name: "friend",
  initialState: {
    friends: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter(
        (friend) => friend._id !== action.payload
      );
    },
  },
  extraReducers: {
    [PendingRequests.pending]: (state, action) => {
      state.isLoading = true;
    },
    [PendingRequests.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends = action.payload;
    },
    [PendingRequests.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [OutGoingRequests.pending]: (state, action) => {
      state.isLoading = true;
    },
    [OutGoingRequests.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends = action.payload;
    },
    [OutGoingRequests.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [AllFriends.pending]: (state, action) => {
      state.isLoading = true;
    },
    [AllFriends.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends = action.payload;
    },
    [AllFriends.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});



export default slice.reducer;
export const { addFriend, removeFriend } = slice.actions;
