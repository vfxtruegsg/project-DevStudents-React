import { createAsyncThunk } from "@reduxjs/toolkit";
import { backAPI } from "../../utils/axiosUtils.js";
import {
  showToastErrorMessage,
  showToastSuccessMessage,
} from "../../utils/showToastErrorMessage.js";

export const updateUserThunk = createAsyncThunk(
  "user/update",
  async (formData, thunkAPI) => {
    try {
      const { id } = formData;
      const { data } = await backAPI.patch(`/user/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      showToastSuccessMessage("Profile updated successfully!");

      return data.data;
    } catch (error) {
      showToastErrorMessage(error.response?.data?.message || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
