import { createTheme } from '@mui/material/styles';


// green: #125B50;
// pink: #E85F5F;
// orange: #E1A400;
//  body: #F1EEE9;

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
        //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: '#F1EEE9',
          borderRadius: 3,
          border: 0,
          color: '#125B50',
          height: 25,
          padding: '0 30px',
          marginBottom: '10px',
        //   boxShadow: '0 3px 5px 2px #E85F5F',
        transition: 'background-color 0.3s, color 0.3s',
        '&:hover': {
          backgroundColor: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'blue',
        },
        '&:active': {
          backgroundColor: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
          color: 'white',
        },
        },
      },
    },
  },
});

export default theme;
