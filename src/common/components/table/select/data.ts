import type { StylesConfig } from 'react-select';

const options = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' },
];

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: '1px solid #2e383e',
    boxShadow: 'none',
    backgroundColor: 'transparent',

    ':active': {
      ...styles[':active'],
    },

    ':hover': {
      ...styles[':hover'],
      border: '1px solid #8f5fe8',
      cursor: 'pointer',
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    display: 'none',
  }),
  menu: (styles) => ({
    ...styles,
    border: '1px solid #8f5fe8',
    backgroundColor: 'transparent',
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? '#8f5fe8' : 'transparent',
    textAlign: 'center',

    ':active': {
      ...styles[':active'],
      backgroundColor: '#8f5fe8',
    },

    ':hover': {
      ...styles[':hover'],
      backgroundColor: '#8f5fe8',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#ffffff',
  }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles, color: '#ffffff' }),
};

export { colourStyles, options };
