import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import flatMap from 'lodash/flatMap';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';
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

import { updateHistorySnapshot } from '@react-story-rich/core/reducers/history';

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
  root: {
    marginBottom: theme.spacing(2),
  },
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
    dispatch,
    injected,
    query,
    onCriticalFailure,
    onCriticalSuccess,
    onFailure,
    onSuccess,
    settings,
    skill,
    snapshot,
    ...passThroughProps
  } = props;

  const getFlag = useCallback((roll) => {
    if (!roll) { return false; }

    const results = getRollResults(roll);

    if (some(results, (r) => r.modifierFlags === '***')) { return 'criticalSuccess'; }
    if (some(results, (r) => r.modifierFlags === '__')) { return 'criticalFailure'; }

    return roll.total === 0 ? 'failure' : 'success';
  }, []);

  const { roll } = snapshot;
  const { tableTopMode } = settings;

  const handleNext = useCallback((flag) => {
    if (['success', 'criticalSuccess'].includes(flag)) {
      return isFunction(onCriticalSuccess) && flag === 'criticalSuccess' ? onCriticalSuccess : onSuccess;
    }

    if (['failure', 'criticalFailure'].includes(flag)) {
      return isFunction(onCriticalFailure) && flag === 'criticalFailure' ? onCriticalFailure : onFailure;
    }

    return noop;
  }, [onCriticalFailure, onCriticalSuccess, onFailure, onSuccess]);

  const flag = useMemo(() => getFlag(roll), [getFlag, roll]);

  const [handleTap, handleKeyPress] = useTap(handleNext(flag), false, injected);

  useEffect(() => {
    if (!roll && injected.enabled) {
      const newRoll = roller.roll(query).toJSON();
      const newFlag = getFlag(newRoll);

      dispatch(updateHistorySnapshot(injected.indexInHistory, { roll: newRoll }));
      enqueueSnackbar(t(`Roller.flag.${newFlag}`), { variant: SEVERITY_BY_FLAG[newFlag] });

      if (tableTopMode === false) {
        handleNext(newFlag)(injected.nav);
      }
    }
  }, [
    dispatch,
    enqueueSnackbar,
    getFlag,
    handleNext,
    handleTap,
    injected.enabled,
    injected.indexInHistory,
    injected.nav,
    query,
    roll,
    t,
    tableTopMode,
  ]);

  if (tableTopMode === false) {
    return null;
  }

  const Action = () => {
    const elementRef = useRef(null);
    useImperativeHandle(ref, () => ({ focus: elementRef.current.focus }));
    useFocus(elementRef, injected);

    return (
      <Button
        disabled={!injected.enabled}
        color="inherit"
        ref={elementRef}
        onClick={handleTap}
        onKeyPress={handleKeyPress}
      >
        {t('Roller.next')}
      </Button>
    );
  };

  return roll && (
    <Alert
      action={<Action />}
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
   */
  dispatch: PropTypes.func.isRequired,
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
     *
     */
    indexInHistory: PropTypes.number.isRequired,
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
   * Callback triggered when Roll result is critical failure
   */
  onCriticalFailure: PropTypes.func,
  /**
   * Callback triggered when Roll result is critical success
   */
  onCriticalSuccess: PropTypes.func,
  /**
   * Callback triggered when Roll result is failure
   */
  onFailure: PropTypes.func.isRequired,
  /**
   * Callback triggered when Roll result is success
   */
  onSuccess: PropTypes.func.isRequired,
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
  skill: PropTypes.oneOf(['INT', 'STR', 'AGI', 'TIN', 'COM', 'CHA', 'FLU']),
  snapshot: PropTypes.object,
};

DiceRollElement.defaultProps = {
  className: '',
  injected: undefined,
  onCriticalFailure: null,
  onCriticalSuccess: null,
  skill: null,
  snapshot: {},
};

export default connect((state, ownProps) => ({
  settings: state.settings,
  snapshot: state.history[ownProps.injected.indexInHistory].snapshot,
}))(DiceRollElement);
