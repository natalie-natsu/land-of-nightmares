import deepPurple from '@material-ui/core/colors/deepPurple';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import teal from '@material-ui/core/colors/teal';

const light = {
  palette: {
    type: 'light',
    primary: deepPurple,
    secondary: teal,
    error: pink,
    warning: orange,
  },
};

const dark = {
  palette: {
    type: 'dark',
    primary: {
      main: deepPurple[200],
    },
    secondary: teal,
    error: {
      main: pink[200],
    },
    warning: {
      main: amber[200],
    },
  },
};

export default { light, dark };
