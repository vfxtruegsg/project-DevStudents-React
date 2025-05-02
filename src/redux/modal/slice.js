import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogOutModalOpen: false,
  isUserModalOpen: false,
  isEditModalOpen: false,
  isAddModalOpen: false,
};

const modalsSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLogOutModal(state) {
      state.isLogOutModalOpen = true;
      state.isUserModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
    },
    openUserModal(state) {
      state.isUserModalOpen = true;
      state.isLogOutModalOpen = false;
      state.isAddModalOpen = false;
      state.isEditModalOpen = false;
    },
    openEditModal(state) {
      state.isEditModalOpen = true;
      state.isUserModalOpen = false;
      state.isLogOutModalOpen = false;
      state.isAddModalOpen = false;
    },
    openAddModal(state) {
      state.isAddModalOpen = true;
      state.isUserModalOpen = false;
      state.isLogOutModalOpen = false;
      state.isEditModalOpen = false;
    },
    closeModal() {
      return initialState;
    },
  },
});

export const {
  openLogOutModal,
  openUserModal,
  openEditModal,
  openAddModal,
  closeModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
