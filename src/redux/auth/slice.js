import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
} from "./operations.js";

const initialState = {
  user: {
    userId: null,
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
      .addCase(refreshThunk.pending, (state, action) => {
        state.isRefreshing = true;
      })

      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.isRefreshing = false;
      })

      .addCase(logoutThunk.fulfilled, (state, action) => {
        return initialState;
      })

      .addCase(refreshThunk.rejected, (state, action) => {
        state.isRefreshing = false;
      })

      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, action) => {
          state.user.userId = action.payload.userId;
          state.user.name = action.payload.name;
          state.user.email = action.payload.email;
          state.user.avatar = action.payload.avatar.url;
          state.user.balance = action.payload.balance;
          state.token = action.payload.accessToken;
          state.isLoggedIn = true;
        }
      );
  },
});

export default slice.reducer;
