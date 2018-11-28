import React from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import styles from './styles';
import {
  HomeScreen,
  CreateScreen,
  LinksScreen,
  SettingsScreen
} from '../screens';
import TabBarIcon from '../components/TabBarIcon';

const {
  tabBarIconStyle,
  heartIconStyle,
} = styles;

const navigateOnce = (getStateForAction) => (action, state) => {
    const { type, routeName } = action;
    return (
      state &&
      type === NavigationActions.NAVIGATE &&
      routeName === state.routes[state.routes.length - 1].routeName
    ) ? state : getStateForAction(action, state);
};

const MainTabRouteConfig = {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'HomeScreen',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
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
      }
    },
    LinksScreen: {
      screen: LinksScreen,
      navigationOptions: {
        tabBarLabel: 'LinksScreen',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ focused }) => (
    		<TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    	),
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'SettingsScreen',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ focused }) => (
    		<TabBarIcon
          focused={focused}
          name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    	),
      }
    },
  };

  const TabNavigatorConfigs = {
    swipeEnabled: false,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      //This is where you set the highlight color for the bottom tab navigation
      activeTintColor: 'black'
    },
    lazy: true
  };

  const MainTabNavigator = TabNavigator(MainTabRouteConfig, TabNavigatorConfigs);

  const AppRouteConfigs = {
    MainTabs: {
      screen: MainTabNavigator
    },
    CreateScreen: {
      screen: CreateScreen
    },

  };

  const AppNavigator = StackNavigator(
    AppRouteConfigs,
    {
      headerMode: 'screen'
    }
  );

  AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

  export { AppNavigator };
