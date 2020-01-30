import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import usePizzicato from 'hooks/usePizzicato';
import usePizzicatoPlay from 'hooks/usePizzicatoPlay';
import useVolume from 'hooks/useVolume';

import Play from 'components/Play';
import Settings from 'components/Settings';
import Credits from 'components/Credits';
import TitleScreen from 'components/TitleScreen';
import ScrollToTop from 'components/ScrollToTop';

import musicPath from './United-Nukkie.mp3';

const musicInfo = {
  author: 'Nukie',
  title: 'United',
};

function App({ settings, allowAudio }) {
  const [mainMusic, isMainMusicLoaded] = usePizzicato({
    loop: true,
    path: musicPath,
    attack: 0.9,
    release: 0.9,
  });
  useVolume(mainMusic, { audio: settings.audio, volume: settings.musicVolume });
  const [isPlaying] = usePizzicatoPlay(mainMusic, allowAudio, isMainMusicLoaded, true);

  const { t } = useTranslation('UI');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isPlaying) {
      enqueueSnackbar(t(`App.nowPlaying`, { name: t(`App.mainMusic`, musicInfo) }), { variant: 'info' });
    }
  }, [enqueueSnackbar, isPlaying, mainMusic, t]);

  return (
    <Router>
      <Switch>
        <Route path="/play">
          <Play mainMusic={mainMusic} />
        </Route>
        <Route path="/settings">
          <ScrollToTop />
          <Settings />
        </Route>
        <Route path="/credits">
          <Credits />
        </Route>
        <Route path="/">
          <ScrollToTop />
          <TitleScreen />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  allowAudio: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    audio: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    musicVolume: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect((state) => ({
  allowAudio: state.allowAudio,
  settings: state.settings,
}))(App);
