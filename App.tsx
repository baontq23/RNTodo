import React from 'react';
import AppContainer from './src/components/app-container';
import Navigator from './src';
import { StatusBar } from 'native-base';

const App = () => {
  return (
    <AppContainer>
      <StatusBar barStyle='light-content' />
      <Navigator />
    </AppContainer>
  );
}

export default App;
