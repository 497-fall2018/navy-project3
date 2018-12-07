import React from 'react';
import { Dimensions, Image, Platform } from 'react-native';
import { TabNavigator, StackNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import styles from './styles';
import { HomeScreen, CreateScreen, ListScreen, SettingsScreen } from '../screens';
import TabBarIcon from '../components/TabBarIcon';

import { DrawerNavigator } from 'react-navigation';

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
            tabBarLabel: 'Home',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={
                        Platform.OS === 'ios'
                        ? `ios-home${focused ? '' : '-outline'}`
                        : 'md-home'
                    }
                />
            ),
        }
    },
    CreateScreen: {
        screen: CreateScreen,
        navigationOptions: {
            tabBarLabel: 'Create',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                />
            ),
        }
    },
    ListScreen: {
        screen: ListScreen,
        navigationOptions: {
            tabBarLabel: 'List Items',
            tabBarLabel: 'New Post',
            // Note: By default the icon is only shown on iOS. Search the showIcon option below.
            tabBarIcon: ({ focused }) => (
                <TabBarIcon
                    focused={focused}
                    name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
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
    AppRouteConfigs, {
        headerMode: 'screen'
    }
);

AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

export { AppNavigator };