import { useMemo } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, setSearch } from '../redux/filterSlice';
import { addContact, deleteContact, getContacts } from '../redux/contactsSlice';

const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const createPhoneBookEntry = data => {
    const normalizedData = data.userName?.toLowerCase();

    if (
      contacts?.some(
        ({ userName }) => userName.toLowerCase() === normalizedData
      )
    ) {
      toast('Such a contact already exists!');
      return;
    }

    dispatch(addContact(data));
  };

  const deletePhoneBookEntry = entryId => {
    dispatch(deleteContact(entryId));
  };

  const handleSearchByName = ({ target: { value } }) => {
    searchContactByName(value);
  };

  const searchContactByName = contactName => {
    dispatch(setSearch(contactName));
  };

  const normalizedFilter = filter?.toLowerCase();

  const filteredContacts = useMemo(() => {
    if (!contacts.length) return;
    if (!normalizedFilter) return contacts;
    return contacts?.filter(({ userName }) =>
      userName.toLowerCase().includes(normalizedFilter)
    );
  }, [normalizedFilter, contacts]);

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h1>Phonebook</h1>
      <ContactForm createPhoneBookEntry={createPhoneBookEntry} />
      <h2>Contacts</h2>
      {contacts?.length ? (
        <>
          <Filter onChange={handleSearchByName} />
          <ContactList
            contacts={filteredContacts}
            deletePhoneBookEntry={deletePhoneBookEntry}
          />
        </>
      ) : (
        <p>There are no contacts!</p>
      )}
    </div>
  );
};

export default App;
