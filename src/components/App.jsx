import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { getContacts } from '../redux/contactsSlice';

const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <div style={{ padding: '20px' }}>
      <ToastContainer />
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {contacts?.length ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        <p>There are no contacts!</p>
      )}
    </div>
  );
};

export default App;
