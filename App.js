import React, { Component } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider } from 'react-native-ui-kitten';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { View, Text } from 'react-native';
import * as Font from 'expo-font';

import Login from './src/views/Login';
import Signup from './src/views/Signup';
import Home from './src/views/Home';
import Settings from './src/views/Settings';
import AgendaDetail from './src/views/AgendaDetail';

const AppNavigator = createStackNavigator({
  Login,
  Signup,
  Home,
  Settings,
  AgendaDetail
});
const AppContainer = createAppContainer(AppNavigator);

class App extends Component {

  async componentDidMount() {
    await Font.loadAsync({
      'helvetica_neue': require('./src/assets/fonts/helvetica_neue.ttf'),
      'helvetica_neue_lt': require('./src/assets/fonts/helvetica_neue_lt.ttf'),
      'helvetica_neue_it': require('./src/assets/fonts/helvetica_neue_it.ttf'),
      'helvetica_neue_md': require('./src/assets/fonts/helvetica_neue_md.ttf'),
      'helvetica_neue_bd': require('./src/assets/fonts/helvetica_neue_bd.ttf'),
      'helvetica_neue_hv': require('./src/assets/fonts/helvetica_neue_hv.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  state = {
    fontLoaded: false
  }

  render() {

    if (!this.state.fontLoaded) return (
      <View>
        <Text>Loading</Text>
      </View>
    );

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={lightTheme}>
        <AppContainer />
      </ApplicationProvider>
    );
  }
}

export default App;