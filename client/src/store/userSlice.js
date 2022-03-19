import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Me } from "../reactQuery/user";

export const getMe = createAsyncThunk("user/getMe", async (params) => {
  return Me(params);
});

const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const slice = createSlice({
  name: "user",
  initialState: {
    user: initialUser,
    isLoading: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("email_cache", action.payload.user.email);
      localStorage.setItem("user_id_cache", action.payload.user._id);
      localStorage.setItem("deviceProperties", "");
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: {
    [getMe.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    [getMe.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const GetMe = () => {
  const user = useSelector((state) => state.user?.user);
  return user;
};

export default slice.reducer;
export const { loginSuccess, logoutSuccess } = slice.actions;
