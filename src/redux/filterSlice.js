import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: null };

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
export const getFilter = state => state.filters.value;
export default filterSlice.reducer;
