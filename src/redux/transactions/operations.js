import { createAsyncThunk } from "@reduxjs/toolkit";
import { backAPI } from "../../utils/axiosUtils.js";

export const getAllTransactions = createAsyncThunk(
  "transactions/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await backAPI.get("/transactions");
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, thunkAPI) => {
    try {
      const response = await backAPI.post("/transactions", {
        date: transaction.date,
        type: transaction.type,
        category: transaction.category,
        comment: transaction.comment,
        sum: transaction.sum,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ _id, date, type, category, comment, sum }, thunkAPI) => {
    try {
      const response = await backAPI.patch(`/transactions/${_id}`, {
        date,
        type,
        category,
        comment,
        sum,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (_id, thunkAPI) => {
    try {
      const response = await backAPI.delete(`/transactions/${_id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getSummary = createAsyncThunk(
  "transactions/summary",
  async (month, year, thunkAPI) => {
    try {
      const response = await backAPI.get("/transactions/summary", {
        params: { month, year },
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "transactions/categories",
  async (type, thunkAPI) => {
    try {
      const [incomeCategories, expenseCategories] = await Promise.all([
        backAPI.get("/transactions/categories", {
          params: { type: "income" },
        }),
        backAPI.get("/transactions/categories", {
          params: { type: "expense" },
        }),
      ]);
      return { INCOME: incomeCategories.data, EXPENSE: expenseCategories.data };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
