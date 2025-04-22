import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToastErrorMessage } from "../../utils/showToastErrorMessage.js";

export const backAPI = axios.create({
  baseURL: "https://project-devstudents-node-js.onrender.com",
});

export const setAuthHeader = (token) => {
  backAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAuthHeader = () => {
  delete backAPI.defaults.headers.common.Authorization;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await backAPI.post("/auth/register", credentials);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      if (error.status === 409) {
        showToastErrorMessage("User already exist!");
        return;
      }

      showToastErrorMessage(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await backAPI.post("/auth/login", credentials);
      setAuthHeader(data.accessToken);
      return data;
    } catch (error) {
      showToastErrorMessage(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    try {
      const { data } = await backAPI.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      showToastErrorMessage(error.message);
      return thunkApi.rejectWithValue(error.message);
    } finally {
      deleteAuthHeader();
    }
  }
);
