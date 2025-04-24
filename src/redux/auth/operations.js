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
      setAuthHeader(data.data.accessToken);

      return data.data;
    } catch (error) {
      if (error.status === 409) {
        showToastErrorMessage("User already exist! Please log in!");
        return thunkApi.rejectWithValue("User already exist! Please log in!");
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

      setAuthHeader(data.data.accessToken);

      const { data: dataUser } = await backAPI.get("/user/current");

      return { ...data.data, ...dataUser.data };
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

export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const token = thunkApi.getState().auth.token;

    if (token === null) {
      return thunkApi.rejectWithValue("Token is not exist");
    }

    try {
      const { data } = await backAPI.post(
        "/auth/refresh",
        {},
        {
          withCredentials: true,
        }
      );

      setAuthHeader(data.data.accessToken);

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
