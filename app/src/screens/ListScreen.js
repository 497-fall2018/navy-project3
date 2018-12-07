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

import {
  CommentsList,
  ItemDisplay
} from '../components';

import { MonoText } from '../components/StyledText';
import {
    handle_comment_change,
    handle_swipe_down,
    handle_swipe_up,
    load_posts,
    loaded_fonts,
    submit_new_comment
} from '../ducks/post'
import SCREEN_IMPORT from 'Dimensions'

const SCREEN_WIDTH = SCREEN_IMPORT.get('window').width;
const SCREEN_HEIGHT = SCREEN_IMPORT.get('window').height;

class ListScreenComponent extends Component {
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


    handleCommentChange = (c) => {
        this.props.handle_comment_change(c);
    }
    submitNewComment = () => {
        this.props.submit_new_comment(this.props.comment, this.props.curr_post_id);
        setTimeout(() => {
            this.props.load_posts();
        }, 1000);
    }

    base64ArrayBuffer(arrayBuffer) {
        var base64    = ''
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

        var bytes         = new Uint8Array(arrayBuffer)
        var byteLength    = bytes.byteLength
        var byteRemainder = byteLength % 3
        var mainLength    = byteLength - byteRemainder

        var a, b, c, d
        var chunk

        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
          // Combine the three bytes into a single integer
          chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

          // Use bitmasks to extract 6-bit segments from the triplet
          a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
          b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
          c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
          d = chunk & 63               // 63       = 2^6 - 1

          // Convert the raw binary segments to the appropriate ASCII encoding
          base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
          chunk = bytes[mainLength]

          a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

          // Set the 4 least significant bits to zero
          b = (chunk & 3)   << 4 // 3   = 2^2 - 1

          base64 += encodings[a] + encodings[b] + '=='
        } else if (byteRemainder == 2) {
          chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

          a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
          b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

          // Set the 2 least significant bits to zero
          c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

          base64 += encodings[a] + encodings[b] + encodings[c] + '='
        }

        return base64
      }


    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            this.props.posts.map(x => {
                return (
                    <Container
                        style={{
                            padding: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: 'black',
                        }}
                    >

                        <Text>{x.title} &nbsp; (${x.price})</Text>
                        <Text>{x.description}</Text>
                        {/* <Image
                            style={{flex: 10, width: SCREEN_WIDTH, resizeMode: 'center'}}
                            source={{uri: "data:" + x.image.contentType + ";base64," + this.base64ArrayBuffer(x.image.data.data)}}
                        /> */}

                    </Container>
                )
            })
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
export { ListScreenComponent };

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

export const ListScreen = connect(mapStateToProps, {
    handle_comment_change,
    handle_swipe_down,
    handle_swipe_up,
    load_posts,
    loaded_fonts,
    submit_new_comment,
})(ListScreenComponent);
