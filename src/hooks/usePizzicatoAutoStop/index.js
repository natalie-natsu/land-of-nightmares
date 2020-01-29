import { useEffect } from 'react';
import isFunction from 'lodash/isFunction';

const usePizzicatoAutoStop = (pizzicato, { enabled }) => useEffect(() => {
  if (pizzicato && isFunction(pizzicato.stop) && enabled === false) {
    pizzicato.stop();
  }
}, [enabled, pizzicato]);

export default usePizzicatoAutoStop;
