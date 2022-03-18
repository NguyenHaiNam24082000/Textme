import { createSlice } from "@reduxjs/toolkit";
import {
  pendingRequests,
  outGoingRequests,
  allFriends,
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
    [addFriend.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addFriend.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends.push(action.payload);
    },
    [addFriend.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeFriend.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeFriend.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.friends = state.friends.filter(
        (friend) => friend._id !== action.payload
      );
    },
    [removeFriend.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;
export const { addFriend, removeFriend } = slice.actions;
