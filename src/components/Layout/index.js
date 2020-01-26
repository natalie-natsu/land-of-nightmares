import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import themeOptions from './theme';

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
    },
  },
  root: ({ theme, backgroundImage }) => ({
    padding: theme.spacing(4, 0),
    width: '100%',
    minHeight: `calc(100vh - ${theme.spacing(4) * 2}px)`,
    background: !isEmpty(backgroundImage) ? `url("${backgroundImage}")` : theme.palette.background.default,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
  }),
});

const useSnackBarStyles = makeStyles({
  variantSuccess: ({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
  }),
  variantError: ({ theme }) => ({
    backgroundColor: theme.palette.error.main,
  }),
  variantWarning: ({ theme }) => ({
    backgroundColor: theme.palette.warning.main,
  }),
  variantInfo: ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
  }),
});

function Layout({ backgroundImage, children, dark }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const mode = useMemo(() => {
    let darkMode = prefersDarkMode;
    if (dark !== null) { darkMode = dark; }

    return darkMode ? 'dark' : 'light';
  }, [dark, prefersDarkMode]);

  const theme = useMemo(() => createMuiTheme(themeOptions[mode]), [mode]);
  const classes = useStyles({ theme, backgroundImage });
  const snackBarClasses = useSnackBarStyles({ theme });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={6}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        classes={snackBarClasses}
      >
        <div className={classes.root}>
          {children}
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  /**
   * A node of your content.
   */
  backgroundImage: PropTypes.node,
  /**
   * A node of your content.
   */
  children: PropTypes.node.isRequired,
  /**
   * If set to true or false, the mod will be forced to dark/light.
   * If undefined, the mod will be set by default
   * according to the browser query setting: `prefers-color-scheme`
   */
  dark: PropTypes.bool,
};

Layout.defaultProps = {
  backgroundImage: '',
  dark: null,
};

export default connect((state) => ({
  ...state.layout,
  dark: state.settings.darkMode,
}))(Layout);
