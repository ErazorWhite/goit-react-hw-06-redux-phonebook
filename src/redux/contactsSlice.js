import { createSlice, nanoid } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const initialState = {
  items: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare({ userName, number }) {
        const id = nanoid();
        return {
          payload: { id, userName, number },
        };
      },
    },
    deleteContact: ({ items }, action) => {
      const deleteIndex = items.findIndex(
        contact => contact.id === action.payload
      );
      if (deleteIndex > -1) items.splice(deleteIndex, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const getContacts = state => state.contacts.items;

const persistConfig = {
  key: 'contacts',
  storage,
};

const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export default persistedContactsReducer;
