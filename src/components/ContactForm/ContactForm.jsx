import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  FormConstolsContainer,
  StyledForm,
  StyledField,
  FieldContainer,
  StyledLabel,
  StyledErrorMessage,
  StyledSubmitButton,
  StyledMaskedInput, // Франкенштейн из Masked + Styled, который под капотом ещё наверное Field от формика инкапсулирует
} from './ContactForm.styled';
import { addContact, getContacts } from '../../redux/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// Инпут маска для номера телефона
const phoneNumberMask = [
  '+',
  /[1-9]/,
  /\d/,
  '(',
  /[0-9]/,
  /\d/,
  /\d/,
  ')',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  '-',
  /\d/,
  /\d/,
  /\d/,
];

const initialValues = {
  userName: '',
  number: '',
};

// Схема для валидации yup
const schema = yup.object().shape({
  userName: yup
    .string()
    .min(3, 'Too short!')
    .max(32, 'Too long!')
    .notOneOf(['1234567890'], 'Invalid name')
    .matches(/^[a-zA-Z\s]+$/, 'Invalid name')
    .required('Required!'),
  number: yup
    .string()
    .matches(/^\+?\d{1,3}\(\d{3}\)\d{2}-\d{2}-\d{3}$/, 'Invalid phone number')
    .required('Required!'),
});

// Далее идёт компонент формы
const ContactForm = () => {
  const contacts = useSelector(getContacts);
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

  const handleSubmit = (values, { resetForm }) => {
    createPhoneBookEntry({ ...values });
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <StyledForm>
        <FormConstolsContainer>
          <StyledLabel htmlFor="userName">
            Name
            <FieldContainer>
              <StyledField
                type="text"
                name="userName"
                placeholder="Enter your name"
              />
              <ErrorMessage name="userName" component={StyledErrorMessage} />
            </FieldContainer>
          </StyledLabel>

          <StyledLabel htmlFor="number">
            Number
            <FieldContainer>
              <StyledField name="number">
                {({ field }) => (
                  <StyledMaskedInput
                    {...field}
                    mask={phoneNumberMask}
                    placeholder="Enter phone number"
                    id="number"
                    type="text"
                    component="input"
                  />
                )}
              </StyledField>
              <ErrorMessage name="number" component={StyledErrorMessage} />
            </FieldContainer>
          </StyledLabel>
          <div>
            <StyledSubmitButton type="submit">Add Contact</StyledSubmitButton>
          </div>
        </FormConstolsContainer>
      </StyledForm>
    </Formik>
  );
};

export default ContactForm;
