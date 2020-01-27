import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import flatMap from 'lodash/flatMap';
import some from 'lodash/some';
import { DiceRoller } from 'rpg-dice-roller';

import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import useFocus from '@react-story-rich/core/hooks/useFocus';
import useTap from '@react-story-rich/core/hooks/useTap';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const SEVERITY_BY_FLAG = {
  success: 'success',
  criticalSuccess: 'success',
  failure: 'error',
  criticalFailure: 'error',
};

const useStyles = makeStyles(() => ({
  alertTitle: {
    fontWeight: 'bold',
  },
}));

const useAlertStyles = makeStyles((theme) => ({
  filledSuccess: {
    color: theme.palette.getContrastText(theme.palette.success.main),
  },
  filledError: {
    color: theme.palette.getContrastText(theme.palette.error.main),
  },
}));

const roller = new DiceRoller();

const getRollResults = (roll) => flatMap(roll.rolls, ({ useInTotal, rolls }) => (
  useInTotal !== false && rolls
));

const DiceRollElement = forwardRef((props, ref) => {
  const classes = useStyles();
  const alertClasses = useAlertStyles();

  const { t } = useTranslation('UI');
  const { enqueueSnackbar } = useSnackbar();

  const {
    className,
    injected,
    onTap,
    query,
    settings,
    skill,
    ...passThroughProps
  } = props;

  const elementRef = useRef(null);
  const [handleTap, handleKeyPress] = useTap(onTap, false, injected);

  useImperativeHandle(ref, () => ({ focus: elementRef.current.focus }));
  useFocus(elementRef, injected);

  const [roll] = useState(roller.roll(query));

  const flag = useMemo(() => {
    const results = getRollResults(roll);

    if (some(results, (r) => r.modifierFlags === '***')) { return 'criticalSuccess'; }
    if (some(results, (r) => r.modifierFlags === '__')) { return 'criticalFailure'; }

    return roll.total === 0 ? 'failure' : 'success';
  }, [roll]);

  useEffect(() => {
    if (flag && injected.enabled) {
      enqueueSnackbar(t(`Roller.flag.${flag}`), { variant: SEVERITY_BY_FLAG[flag] });
      if (settings.tableTopMode === false) { handleTap(); }
    }
  }, [enqueueSnackbar, flag, handleTap, injected.enabled, settings.tableTopMode, t]);

  return (
    <Alert
      action={(
        <Button ref={elementRef} onClick={handleTap} onKeyPress={handleKeyPress} color="inherit">
          {t('Roller.next')}
        </Button>
      )}
      classes={alertClasses}
      severity={SEVERITY_BY_FLAG[flag]}
      variant="filled"
      {...passThroughProps}
    >
      {skill !== null && <AlertTitle className={classes.alertTitle}>{t(`Roller.skill.${skill}`)}</AlertTitle>}
      {t(`Roller.youRolled`, { roll: roll.output })}
      &nbsp;
      {t(`Roller.flag.${flag}`)}
    </Alert>
  );
});

DiceRollElement.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * @ignore
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
  /**
   * If set to one of these, the title will say : Roll of {skill}!
   */
  skill: PropTypes.oneOf(['INT', 'STR', 'AGI', 'STI', 'COMP', 'CHA', 'FLU']),
};

DiceRollElement.defaultProps = {
  className: '',
  injected: undefined,
  onTap: null,
  skill: null,
};

export default connect((state) => ({ settings: state.settings }), {})(DiceRollElement);
