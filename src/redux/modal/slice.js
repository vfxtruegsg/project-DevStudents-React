import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogOutModalOpen: false,
  isEditModalOpen: false,
  isAddModalOpen: false,
};

const modalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLogOutModal(state) {
      state.isLogOutModalOpen = true;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
    },
    openEditModal(state) {
      state.isEditModalOpen = true;
      state.isLogOutModalOpen = false;
      state.isAddModalOpen = false;
    },
    openAddModal(state) {
      state.isAddModalOpen = true;
      state.isLogOutModalOpen = false;
      state.isEditModalOpen = false;
    },
    closeModal() {
      return initialState;
    },
  },
});

export const { openLogOutModal, openEditModal, openAddModal, closeModal } =
  modalsSlice.actions;

export default modalsSlice.reducer;
