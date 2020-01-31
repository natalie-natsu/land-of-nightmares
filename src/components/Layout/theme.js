import deepPurple from '@material-ui/core/colors/deepPurple';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import deepOrange from '@material-ui/core/colors/deepOrange';
import lightGreen from '@material-ui/core/colors/lightGreen';

const light = {
  palette: {
    type: 'light',
    primary: deepPurple,
    secondary: teal,
    success: lightGreen,
    error: red,
    warning: orange,
  },
};

const dark = {
  palette: {
    type: 'dark',
    primary: { main: deepPurple[200] },
    secondary: teal,
    success: { main: lightGreen[200] },
    info: { main: cyan[200] },
    error: { main: red[200] },
    warning: { main: deepOrange[200] },
  },
};

export default { light, dark };
