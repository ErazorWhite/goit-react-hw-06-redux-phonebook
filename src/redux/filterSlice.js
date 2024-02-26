import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: "" };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action) {
      state.name = action.payload;
    },
  },
});

export const { setSearch } = filterSlice.actions;
export const getFilter = state => state.filters.name;
export default filterSlice.reducer;
