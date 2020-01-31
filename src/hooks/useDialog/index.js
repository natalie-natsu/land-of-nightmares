import { useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import noop from 'lodash/noop';

import Navigation from '@react-story-rich/core/classes/Navigation';

const useDialog = (pizzicato, allowAudio, isLoaded, { dialog, onTap, onTimeout, timeout }) => {
  const onDialogTap = useMemo(() => (
    isEmpty(dialog) || isFunction(onTap) ? onTap : Navigation.skip
  ), [dialog, onTap]);

  const dialogTimeout = useMemo(() => (
    (allowAudio && !isEmpty(dialog) && timeout === 0 && pizzicato !== null && isLoaded)
      ? pizzicato.getRawSourceNode().buffer.duration * 1000
      : timeout
  ), [allowAudio, dialog, isLoaded, pizzicato, timeout]);

  const onDialogTimeout = useMemo(() => {
    if (dialogTimeout === 0) { return !isFunction(onTimeout) ? noop : onTimeout; }

    return isFunction(onTimeout) ? onTimeout : Navigation.skip;
  }, [dialogTimeout, onTimeout]);

  return [onDialogTap, onDialogTimeout, dialogTimeout];
};

export default useDialog;
