import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../src/components/TabBarIcon';
import HomeScreen from '../src/screens/HomeScreen';
import CreateScreen from '../src/screens/CreateScreen';
import SettingsScreen from '../src/screens/SettingsScreen';

const HomeStack = createStackNavigator({
	Home: HomeScreen,
});

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

const CreateStack = createStackNavigator({
	Create: CreateScreen,
});

CreateStack.navigationOptions = {
	tabBarLabel: 'Create',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
	),
};

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
	tabBarLabel: 'Settings',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
	),
};

export default createBottomTabNavigator({
	HomeStack,
	CreateStack,
	SettingsStack,
});