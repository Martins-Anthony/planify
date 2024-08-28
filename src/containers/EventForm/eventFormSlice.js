import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState: initialState,
  reducers: {
    addEvent(state, action) {
      state.data.push(action.payload);
    },
    deleteEvent(state, action) {
      state.data = state.data.filter(data => data.id !== action.payload);
    },
    resetEvents(state) {
      return initialState;
    },
    updateEvent(state, action) {
      const { id, updates } = action.payload;
      const eventIndex = state.data.findIndex(event => event.id === id);
      if (eventIndex !== -1) {
        state.data[eventIndex] = { ...state.data[eventIndex], ...updates };
      }
    },
  },
});

export const { addEvent, deleteEvent, resetEvents, updateEvent } =
  eventSlice.actions;
export default eventSlice.reducer;
