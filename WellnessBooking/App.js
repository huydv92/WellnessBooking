/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Login from './src/containers/auth/Login';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import  AppWithNavigationState from './src/configs/navigations';
import { Loading } from './src/components/loading/Loading'

import React from 'react';
import {
  View
} from 'react-native';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
          <Loading />
        </View>
      </Provider>
    </>
  );
};
export default App;
