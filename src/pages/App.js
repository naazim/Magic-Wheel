import React from 'react';
import Main from './Main';
import { withNamespaces } from 'react-i18next';
import '../scss/main.scss';

const App = () => {

  return (
   <Main/>
  );
};

export default withNamespaces()(App);
