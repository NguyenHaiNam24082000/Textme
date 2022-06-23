import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

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
    updateUser: (state, action) => {
      state.user = { ...state.user, user: action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("email_cache", state.user.user.email);
      localStorage.setItem("user_id_cache", state.user.user._id);
      localStorage.setItem("deviceProperties", "");
    },
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
});

export const GetMe = () => {
  const user = useSelector((state) => state.user?.user);
  return user;
};

export default slice.reducer;
export const { loginSuccess, logoutSuccess, updateUser } = slice.actions;
