import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notify(state, action) {
      return action.payload;
    },

    mute(state, action) {
      return null;
    },
  },
});

export const { notify, mute } = notificationSlice.actions;
export default notificationSlice.reducer;
