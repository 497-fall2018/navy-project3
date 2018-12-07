import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';
import { Container, Header, Content, Button, Input, InputGroup, Text } from 'native-base';
import { Icon } from 'react-native-elements';
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
    handle_comment_change,
    handle_swipe_down,
    handle_swipe_up,
    load_posts,
    loaded_fonts,
    submit_new_comment
} from '../../ducks/post'


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
    componentDidMount() {
        this.props.load_posts();
    }
    onSwipeUp(gestureState) {
        this.props.handle_swipe_up();
    }
    onSwipeDown(gestureState) {
        this.props.handle_swipe_down();
    }
    handleCommentChange = (c) => {
        this.props.handle_comment_change(c);
    }
    submitNewComment = () => {
        this.props.submit_new_comment(this.props.comment, this.props.curr_post_id);
        setTimeout(() => {
            this.props.load_posts();
        }, 1000);
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
                <View style={{flex: 1}}>
                    <ItemDisplay/>
                    <Text>{"   post id: " + this.props.posts[0]["_id"]}</Text>
                    <GestureRecognizer
                        onSwipeUp={(state) => this.onSwipeUp(state)}
                        onSwipeDown={(state) => this.onSwipeDown(state)}
                        config={config}
                    >
                        <View style={swipeUpCommentContainer}>
                            <Text style={swipeUpCommentText}> {this.props.showComments == true ? "swipe down to hide comments":"swipe up to see comments"} </Text>
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
                        <Container style={{flexDirection:"row", height: 60}}>
                            <View style={{width: '80%', marginLeft: 10}}>
                                <InputGroup borderType="rounded" >
                                    <Input onChangeText={(text)=>this.handleCommentChange(text)} value={this.props.comment}/>
                                </InputGroup>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <Button onPress={()=>this.submitNewComment()} style={{width: 40, height: 32, justifyContent: 'center'}} >
                                    <Icon
                                        name='send' color="white" />
                                </Button>
                            </View>
                        </Container>
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
    const { comment, comments, curr_post_id, loading, posts, showComments } = post;
    return {
        ...ownProps,
        comment,
        comments,
        curr_post_id,
        loading,
        posts,
        showComments,
    };
};

export const HomeScreen = connect(mapStateToProps, {
    handle_comment_change,
    handle_swipe_down,
    handle_swipe_up,
    load_posts,
    loaded_fonts,
    submit_new_comment,
})(HomeScreenComponent);
