import { styled } from 'styled-components';

export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`;

export const StyledDeleteButton = styled.button`
  background-color: white;
  border: 1px solid #c0c0c0;
  border-radius: 5%;
  padding: 3px 10px;
  font-weight: 600;
  transition: background-color ease-in 250ms;

  &:hover,
  &:focus {
    background-color: aquamarine;
  }
`;

export const StyledContactEntryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledContactEntry = styled.div`
font-size: 1.1em;
display: flex;
gap: 5px;
`