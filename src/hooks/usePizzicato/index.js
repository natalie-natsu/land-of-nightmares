import { useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import Pizzicato from 'pizzicato';

const usePizzicato = (options = {}, enabled = true, onLoaded, source = 'file') => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sound, setSound] = useState(null);

  const shouldCreateSound = useMemo(() => (
    sound === null && !isEmpty(options.path) && enabled === true
  ), [enabled, options.path, sound]);

  if (shouldCreateSound) {
    setSound(new Pizzicato.Sound({ source, options }, () => {
      setIsLoaded(true);
      if (isFunction(onLoaded)) { onLoaded(sound); }
    }));
  }

  return [sound, isLoaded];
};

export default usePizzicato;
