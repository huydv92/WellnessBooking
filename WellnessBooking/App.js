/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// import Login from './src/containers/auth/Login';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Login from './src/containers/auth/Login';
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
          <Login />
          <Loading />
        </View>
      </Provider>
    </>
  );
};
export default App;
