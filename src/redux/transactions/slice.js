import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  getAllTransactions,
  getCategories,
  getSummary,
} from "./operations.js";
import { logoutThunk } from "../auth/operations.js";

const handlePending = (state) => {
  state.loading = true;
};
const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    items: [],
    editItem: { isEditItem: false, _id: null, type: "", category: "" },
    loading: false,
    error: null,
    summary: {},
    categories: {},
  },
  reducers: {
    changeEditTransaction(state, action) {
      state.editItem.isEditItem = true;
      state.editItem._id = action.payload._id;
      state.editItem.type = action.payload.type;
      state.editItem.category = action.payload.category;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.data;
      })

      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload.data.transaction);
      })

      .addCase(editTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.editItem.isEditItem = false;
        state.editItem._id = null;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.items.splice(index, 1, {
          date: action.payload.data.date,
          type: action.payload.data.type,
          category: action.payload.data.category,
          comment: action.payload.data.comment,
          sum: action.payload.data.sum,
        });
      })

      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        // state.items.data.splice(index, 1);
      })

      .addCase(getSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.summary = action.payload.data;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload.data;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = false;
      })

      .addMatcher(
        isAnyOf(
          getAllTransactions.pending,
          addTransaction.pending,
          editTransaction.pending,
          deleteTransaction.pending,
          getSummary.pending,
          getCategories.pending,
          logoutThunk.pending
        ),
        handlePending
      )

      .addMatcher(
        isAnyOf(
          getAllTransactions.rejected,
          addTransaction.rejected,
          editTransaction.rejected,
          deleteTransaction.rejected,
          getSummary.rejected,
          getCategories.rejected,
          logoutThunk.rejected
        ),
        handleRejected
      );
  },
});
export const { changeEditTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
