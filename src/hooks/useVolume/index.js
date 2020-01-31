import { useEffect } from 'react';

const useVolume = (sound, { audio, volume }) => useEffect(() => {
  if (sound !== null) {
    // Pizzicato works with mutations
    // eslint-disable-next-line no-param-reassign
    sound.volume = !audio ? 0 : volume / 100;
  }
}, [sound, audio, volume]);

export default useVolume;
