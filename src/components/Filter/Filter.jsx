import debounce from 'lodash.debounce';
import { StyledSearchByNameInput } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const handleSearchByName = ({ target: { value } }) => {
    searchContactByName(value);
  };

  const searchContactByName = contactName => {
    dispatch(setSearch(contactName));
  };

  return (
    <label htmlFor="searchByName">
      <p>Find contacts by name</p>
      <StyledSearchByNameInput
        type="text"
        name="searchByName"
        style={{ padding: '5px' }}
        onChange={debounce(handleSearchByName, 400)}
      />
    </label>
  );
};

export default Filter;
