import type { StylesConfig } from 'react-select';

const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    padding: '0 12px',
    minHeight: 'auto',
    borderRadius: '0px',
    border: '1px solid #2e383e',
    boxShadow: 'none',

    ':active': {
      ...styles[':active'],
      outline: 'none',
    },

    ':hover': {
      ...styles[':focus'],
      border: '1px solid #2e383e',
      cursor: 'pointer',
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    padding: '0px',
    minHeight: 'auto',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    padding: '6px 8px',
    minHeight: 'auto',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#191c24',
    borderRadius: '0px',
    border: '1px solid #8f5fe8',
    padding: '0px',
  }),
  option: (styles, { isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? '#8f5fe8' : 'transparent',
    color: '#ffffff',

    ':active': {
      ...styles[':active'],
      backgroundColor: '#8f5fe8',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#ffffff',
  }),
  input: (styles) => ({ ...styles }),
  placeholder: (styles) => ({ ...styles }),
};

export default colourStyles;
