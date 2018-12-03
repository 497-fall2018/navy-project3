import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Container, Header, Content, Button, Text } from 'native-base';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {
  CommentsList,
  ItemDisplay
} from '../../components';
import styles from './styles';
const {
    comment,
    container,
    buttons,
    buttonsContainer,
    developmentModeText,
    contentContainer,
    welcomeContainer,
    welcomeImage,
    getStartedContainer,
    homeScreenFilename,
    codeHighlightText,
    codeHighlightContainer,
    getStartedText,
    swipeUpCommentContainer,
    swipeUpCommentText,
    navigationFilename,
    helpContainer,
    helpLink,
    helpLinkText,
} = styles;
import { MonoText } from '../../components/StyledText';
import {
    handle_swipe_down,
    handle_swipe_up,
    loaded_fonts,
} from '../../ducks/post'
import {ItemDisplayComponent} from '../../components/';

class HomeScreenComponent extends Component {
    static navigationOptions = {
        header: null,
    };

    async componentWillMount() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.props.loaded_fonts();
    }
    onSwipeUp(gestureState) {
        this.props.handle_swipe_up();
    }
    onSwipeDown(gestureState) {
        this.props.handle_swipe_down();
    }
    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        if (this.props.loading) {
            return <Expo.AppLoading />;
        }
        return (
            <Container
            >
                <View style={container}>
                    <ItemDisplayComponent></ItemDisplayComponent>
                    <GestureRecognizer
                        onSwipeUp={(state) => this.onSwipeUp(state)}
                        onSwipeDown={(state) => this.onSwipeDown(state)}
                        config={config}
                        style={{
                          flex: 1,
                        }}
                    >
                        <View style={swipeUpCommentContainer}>
                            <Text style={swipeUpCommentText}> swipe up to comment </Text>
                        </View>
                    </GestureRecognizer>
    {/*                <View style={tabBarInfoContainer}>
                        <Text style={tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

                        <View style={[codeHighlightContainer, navigationFilename]}>
                            <MonoText style={codeHighlightText}></MonoText>
                        </View>
                    </View>*/}
                </View>

                {this.props.showComments &&
                    <ScrollView style={container}>
                        <CommentsList />
                    </ScrollView>
                    }
            </Container>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                    tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}
export { HomeScreenComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { loading, showComments } = post;
    return {
        ...ownProps,
        loading,
        showComments,
    };
};

export const HomeScreen = connect(mapStateToProps, {
    handle_swipe_down,
    handle_swipe_up,
    loaded_fonts,
})(HomeScreenComponent);
