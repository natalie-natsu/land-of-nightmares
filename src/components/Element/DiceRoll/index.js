import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isFunction from 'lodash/isFunction';
import { DiceRoller } from 'rpg-dice-roller';

import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import useFocus from '@react-story-rich/core/hooks/useFocus';
import useTap from '@react-story-rich/core/hooks/useTap';

import Die from '@react-story-rich/ui/components/Die';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
}));

const roller = new DiceRoller();

const DiceRollElement = forwardRef((props, ref) => {
  const classes = useStyles();
  const { t } = useTranslation('UI');
  const { enqueueSnackbar } = useSnackbar();

  const {
    className,
    injected,
    onTap,
    query,
    settings,
    ...passThroughProps
  } = props;

  console.log(injected);

  const elementRef = useRef(null);
  const [handleTap, handleKeyPress] = useTap(onTap, false, injected);

  useImperativeHandle(ref, () => ({ focus: elementRef.current.focus }));
  useFocus(elementRef, injected);

  const successModifier = '>10'; // Hard coded for now, but success will depend of dice Roll type

  const [roll] = useState(roller.roll(`${query}${successModifier}`));
  const severity = useMemo(() => (roll.total === 0 ? 'error' : 'success'), [roll.total]);

  if (injected.enabled && !settings.tableTopMode) {
    if (isFunction(onTap)) { onTap(injected.nav, injected, roll); }

    return null;
  }

  console.log(roll);


  return (
    <Alert
      severity={severity}
      variant="outlined"
      action={(
        <Button ref={elementRef} onClick={handleTap} onKeyPress={handleKeyPress}>
        Next
        </Button>
    )}
    >
      <AlertTitle>{roll.notation}</AlertTitle>
      {roll.output}
    </Alert>
  );
});

DiceRollElement.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A set of props injected by the Story renderer
   */
  injected: PropTypes.shape({
    /**
     * If set to false, component will not be focused when being enabled.
     */
    autoFocus: PropTypes.bool.isRequired,
    /**
     * A Flag for indicating if the Element is currently active
     */
    enabled: PropTypes.bool.isRequired,
    /**
     * The location of the Element in the story tree
     */
    key: PropTypes.number.isRequired,
    /**
     * A set of navigation methods
     * @see Navigation Class description
     */
    nav: PropTypes.object.isRequired,
  }),
  /**
   * Callback triggered when Element is enabled and is clicked or key pressed.
   */
  onTap: PropTypes.func,
  /**
   * http://rpg.greenimp.co.uk/dice-roller/?
   */
  query: PropTypes.string.isRequired,
  /**
   * @ignore
   */
  settings: PropTypes.shape({
    tableTopMode: PropTypes.bool.isRequired,
  }).isRequired,
};

DiceRollElement.defaultProps = {
  className: '',
  injected: undefined,
  onTap: null,
};

export default connect((state) => ({ settings: state.settings }), {})(DiceRollElement);
