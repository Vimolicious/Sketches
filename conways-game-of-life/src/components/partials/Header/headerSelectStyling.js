export default {
  container: provided => ({
    ...provided,
    height: '100%',
    border: 'none',
    fontWeight: '700',
  }),
  singleValue: provided => ({
    ...provided,
    color: 'white',
  }),
  control: provided => ({
    ...provided,
    border: 'none',
    boxShadow: 'none',
    borderRadius: '8px',
    '&:hover': {
      cursor: 'pointer',
    },
    width: '150px',
    margin: '0',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  }),
  menu: provided => ({
    ...provided,
    width: '150px',
  }),
  menuList: provided => ({
    ...provided,
    backgroundColor: '#08151c',
    color: 'white',
  }),
  option: (provided, { isDisabled, isFocused }) => {
    return {
      ...provided,
      '&:hover': {
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      },
      '&:active': {
        backgroundColor: '#070b0e',
      },
      backgroundColor: isFocused ? '#121e25' : provided.backgroundColor,
      color: isDisabled ? '#aaa' : 'white',
    };
  },
};
