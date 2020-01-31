import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Root } from 'native-base';
import store from './store';
import { Provider } from 'react-redux';


import Home from './Home';
import Telkom from './Telkom';
import History from './History';
import Detail from './Detail';
import Scanner from './Scanner';
import Login from './Login';
import Form from './Form';
import KirimEmail from './KirimEmail';

const MainNavigator = createStackNavigator({
  Telkom : { screen : Telkom },
  Login : { screen : Login },
  Home : { screen : Home },
  KirimEmail: { screen: KirimEmail },
  Form : { screen : Form },
  History : { screen : History },
  Detail : { screen : Detail },
  Scanner : { screen : Scanner },
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
};
