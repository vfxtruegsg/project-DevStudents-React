import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getUserDataThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
  userEditThunk,
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
  isAuthLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.isAuthLoading = false;
      })

      .addCase(logoutThunk.fulfilled, (state, action) => {
        return initialState;
      })

      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user.userId = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.avatar = action.payload.avatar;
        state.user.balance = action.payload.balance;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user.userId = action.payload.userId;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.avatar = action.payload.avatar.url;
        state.user.balance = action.payload.balance;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
      })

      .addCase(getUserDataThunk.fulfilled, (state, action) => {
        state.user.userId = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.avatar = action.payload.avatar.url;
        state.user.balance = action.payload.balance;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
      })

      .addCase(userEditThunk.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.avatar = action.payload.avatar.url;
        state.isLoggedIn = true;
        state.isAuthLoading = false;
      })

      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          refreshThunk.pending,
          logoutThunk.pending,
          getUserDataThunk.pending,
          userEditThunk.pending
        ),
        (state, action) => {
          state.isAuthLoading = true;
        }
      )

      .addMatcher(
        isAnyOf(
          registerThunk.rejected,
          loginThunk.rejected,
          refreshThunk.rejected,
          logoutThunk.rejected,
          getUserDataThunk.rejected,
          userEditThunk.rejected
        ),
        (state, action) => {
          state.isAuthLoading = false;
        }
      );
  },
});

export default slice.reducer;
