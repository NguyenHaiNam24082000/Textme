import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import friendSlice from "./friendSlice";
// import messageSlice from "./messageSlice";

const reducer = {
  user: userSlice,
  ui: uiSlice,
  friend: friendSlice,
  // message: messageSlice,
};

const store = configureStore({ reducer });

export default store;
