import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations.js";

const initialState = {
  user: {
    currentUserId: null,
    name: null,
    email: null,
    avatar: null,
    balance: 0,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user.currentUserId = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.avatar = action.payload.user.avatar.url;
        state.user.balance = action.payload.user.balance;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.isRefreshing = false;
      })
      .addCase(refreshThunk.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.isRefreshing = false;
      });
  },
});

export default slice.reducer;
