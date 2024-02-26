import { useSelector } from 'react-redux';
import ContactListItem from '../ContactListItem/ContactListItem';
import { StyledUnorderedList } from './ContactList.styled';
import { getContacts } from '../../redux/contactsSlice';
import { useMemo } from 'react';
import { getFilter } from '../../redux/filterSlice';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const normalizedFilter = filter?.toLowerCase();

  const filteredContacts = useMemo(() => {
    if (!contacts.length) return;
    if (!normalizedFilter) return contacts;
    return contacts?.filter(({ userName }) =>
      userName.toLowerCase().includes(normalizedFilter)
    );
  }, [normalizedFilter, contacts]);

  return (
    <>
      <StyledUnorderedList>
        {filteredContacts.map(({ id, userName, number }) => (
          <ContactListItem
            key={id}
            id={id}
            userName={userName}
            number={number}
          />
        ))}
      </StyledUnorderedList>
    </>
  );
};

export default ContactList;
