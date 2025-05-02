import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToastErrorMessage } from "../../utils/showToastErrorMessage.js";
import {
  backAPI,
  setAuthHeader,
  deleteAuthHeader,
} from "../../utils/axiosUtils.js";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await backAPI.post("/auth/register", credentials, {
        withCredentials: true,
      });
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
      const { data } = await backAPI.post("/auth/login", credentials, {
        withCredentials: true,
      });

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
          withCredentials: true,
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

export const userEditThunk = createAsyncThunk(
  "auth/usermodal",
  async (credentials, thunkApi) => {
    const token = thunkApi.getState().auth.token;
    try {
      const { data } = await backAPI.patch("/user/update", credentials, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      return data.data;
    } catch (error) {
      showToastErrorMessage(error.message);

      return thunkApi.rejectWithValue(error.message);
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

export const getUserDataThunk = createAsyncThunk(
  "auth/userData",
  async (_, thunkApi) => {
    try {
      const { data } = await backAPI.get("/user/current");

      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
