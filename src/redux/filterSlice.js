import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: '' };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setSearch } = filterSlice.actions;
export default filterSlice.reducer;
