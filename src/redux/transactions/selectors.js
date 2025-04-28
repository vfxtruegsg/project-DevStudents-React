export const selectTransactions = (state) => state.transactions.items;
export const selectIsEditTransaction = (state) =>
  state.transactions.editItem.isEditItem;
export const selectEditTransactionId = (state) =>
  state.transactions.editItem._id;
export const selectLoading = (state) => state.transactions.loading;
export const selectError = (state) => state.transactions.error;
export const selectSummary = (state) => state.transactions.summary;
export const selectCategories = (state) => state.transactions.categories;
