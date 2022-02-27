import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const reducer = {
  user: userSlice,
};

const store = configureStore({ reducer });

export default store;
