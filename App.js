import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Navigat from './src/Navigatioin';
console.disableYellowBox = true;
class App extends Component {
  render() {
    return (
      <Navigat />
    )
  }
}
export default App
AppRegistry.registerComponent('App', () => App)