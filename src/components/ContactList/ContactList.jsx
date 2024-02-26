import ContactListItem from '../ContactListItem/ContactListItem';
import { StyledUnorderedList } from './ContactList.styled';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deletePhoneBookEntry }) => {
  return (
    <>
      <StyledUnorderedList>
        {contacts.map(({ id, userName, number }) => (
          <ContactListItem
            key={id}
            id={id}
            userName={userName}
            number={number}
            deletePhoneBookEntry={deletePhoneBookEntry}
          />
        ))}
      </StyledUnorderedList>
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deletePhoneBookEntry: PropTypes.func.isRequired,
};
