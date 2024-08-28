import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    show: false,
    id: null,
    title: '',
    body: null,
    footer: null,
  },
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.footer = action.payload.footer || null;
    },
    hideModal: state => {
      state.show = false;
      state.id = null;
      state.title = '';
      state.body = null;
      state.footer = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
