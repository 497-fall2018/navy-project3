import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Modal, View, Text, Platform, BackHandler } from 'react-native';
import { Container, Drawer } from 'native-base';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { AppNavigator } from './config/route';

class Root extends Component {
    render() {
        return (
            <Container>
                <AppNavigator/>
            </Container>
        );
    }
};

export default (Root);
