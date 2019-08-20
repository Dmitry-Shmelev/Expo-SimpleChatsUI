import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import MessagesScreen from '../screens/Chats/MessagesScreen';
import NewMatchesScreen from '../screens/Chats/NewMatchesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SendMessageScreen from '../screens/Chats/SendMessageScreen';
import ViewProfileScreen from '../screens/Chats/ViewProfileScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

MessagesScreen.navigationOptions = {
  tabBarLabel: 'Messages',
}
NewMatchesScreen.navigationOptions = {
  tabBarLabel: 'New Matches',
}
const ChatsTabNavigator = createMaterialTopTabNavigator(
  {
    Messages: MessagesScreen,
    NewMatches: NewMatchesScreen,
  }
);

const ChatsStack = createStackNavigator(
  {
    ChatsTab: ChatsTabNavigator,
    SendMessage: SendMessageScreen,
    ViewProfile: ViewProfileScreen,
  }
)
ChatsStack.navigationOptions = {
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
  ),
};

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  ChatsStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
