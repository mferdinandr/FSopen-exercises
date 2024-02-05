import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    onFilter(state = 'ALL', action) {
      return action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { onFilter } = filterSlice.actions;
