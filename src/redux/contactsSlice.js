import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  contacts: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare({userName, number}) {
        const id = nanoid();
        return {
          payload: { id, userName, number },
        };
      },
    },
    deleteContact: (state, action) => {
      state.contacts.splice(action.payload, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;
