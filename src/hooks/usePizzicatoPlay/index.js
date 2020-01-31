import { useCallback, useEffect, useState } from 'react';
import isBoolean from 'lodash/isBoolean';

const usePizzicatoPlay = (pizzicato, allowAudio, isLoaded, autoPlay) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playWhenLoaded = useCallback(() => {
    if (pizzicato && allowAudio && isLoaded && !isPlaying) {
      setIsPlaying(true);
      pizzicato.play();
    }
    return () => pizzicato.stop();
  }, [allowAudio, isLoaded, isPlaying, pizzicato]);

  useEffect(() => {
    if (isBoolean(autoPlay)) { playWhenLoaded(isLoaded); }
  }, [autoPlay, isLoaded, pizzicato, playWhenLoaded]);

  return [isPlaying, playWhenLoaded];
};

export default usePizzicatoPlay;
