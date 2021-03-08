import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Index from '../screens/init';
import Signin from '../screens/signin';
import Signup from '../screens/signup';
import Forget from '../screens/forget';
import Forgetsuccess from '../screens/forgetsuccess';
import Signinmobile from '../screens/signinMobile';
import Verify from '../screens/verify';
import Main from '../screens/main';
import Love from '../screens/love';
import Discover from '../screens/discover';
import Song from '../screens/song';
import Nowplay from '../screens/nowPlay';
import Setting from '../screens/setting';
import Profile from '../screens/profile';
import ResetPass from '../screens/resetPass';
import ArtistDetail from '../screens/artistDetail';

const commonDefaultNavigationOptions = {
  headerBackTitle: 'Back',
  headerStyle: {
    backgroundColor: '#E4234B',
    elevation: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontFamily: 'Roboto',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
};

const WelcomeStack = createStackNavigator(
  {
    Index: {
      screen: Index,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signin: {
      screen: Signin,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false,
      },
    },
    Forget: {
      screen: Forget,
      navigationOptions: {
        headerShown: false,
      },
    },
    Forgetsuccess: {
      screen: Forgetsuccess,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signinmobile: {
      screen: Signinmobile,
      navigationOptions: {
        headerShown: false,
      },
    },
    Verify: {
      screen: Verify,
      navigationOptions: {
        headerShown: false,
      },
    },
    Main: {
      screen: Main,
      navigationOptions: {
        headerShown: false,
      },
    },
    Love: {
      screen: Love,
      navigationOptions: {
        headerShown: false,
      },
    },
    Discover: {
      screen: Discover,
      navigationOptions: {
        headerShown: false,
      },
    },
    Song: {
      screen: Song,
      navigationOptions: {
        headerShown: false,
      },
    },
    Nowplay: {
      screen: Nowplay,
      navigationOptions: {
        headerShown: false,
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        headerTitle: (
          <View style={{width: '80%', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 20}}>Settings</Text>
          </View>
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerTitle: (
          <View style={{width: '80%', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 20}}>Edit Profile</Text>
          </View>
        ),
      },
    },
    ResetPass: {
      screen: ResetPass,
      navigationOptions: {
        headerTitle: (
          <View style={{width: '80%', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 20}}>Reset Password</Text>
          </View>
        ),
      },
    },
    ArtistDetail: {
      screen: ArtistDetail,
      navigationOptions: {
        headerTitle: (
          <View style={{width: '80%', alignItems: 'center'}}>
            <Text style={{color: '#fff', fontSize: 20}}>Artist Detail</Text>
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: commonDefaultNavigationOptions,
  },
);

const AppSwitchStack = createSwitchNavigator(
  {
    Welcome: WelcomeStack,
  },
  {
    initialRouteName: 'Welcome',
  },
);

export default createAppContainer(AppSwitchStack);
