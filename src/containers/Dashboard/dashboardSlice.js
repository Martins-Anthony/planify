import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  titles: {
    mainTitle: 'planning title',
    groupLabelTitle: 'group label title',
  },
  images: {
    background: { image: null, coordinate: { x: 0, y: 0, w: 1100, h: 776 } },
    logos: {
      oneLogo: null,
      twoLogo: null,
    },
  },
  labelList: [],
  days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    updateNestedFields(state, action) {
      Object.keys(action.payload).forEach(path => {
        let target = state;
        const keys = path.split('.');

        keys.slice(0, -1).forEach(key => {
          if (!target[key]) {
            target[key] = {};
          }
          target = target[key];
        });

        target[keys[keys.length - 1]] = action.payload[path];
      });
    },
    resetData(state) {
      return initialState;
    },
    deleteData(state, action) {
      const path = action.payload[0];
      const keys = path.split('.');
      let target = state;

      keys.slice(0, -1).forEach(key => {
        if (target[key]) {
          target = target[key];
        }
      });

      delete target[keys[keys.length - 1]];
    },
    addLabel(state, action) {
      state.labelList.push(action.payload);
    },
    deleteLabel(state, action) {
      state.labelList = state.labelList.filter(
        label => label.id !== action.payload
      );
    },
  },
});

export const {
  updateNestedFields,
  resetData,
  deleteData,
  addLabel,
  deleteLabel,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
