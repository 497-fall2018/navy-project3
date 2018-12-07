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
    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };
        return (
            this.props.posts.map(x => {
                console.log(x);
                return (
                    <Container>
                        <Text>Title: {x.title}</Text>
                        <Text>{x.description}</Text>
                        <Text>{x["_id"]}</Text>

                        {/* <Image source={x.image.data} /> */}
                    </Container>
                )
            })

            // <Container>
            //     <View style={{flex: 1}}>
            //         <ItemDisplay/>
            //         <Text>{"   post id: " + this.props.posts[0]["_id"]}</Text>
            //     </View>

            //     {this.props.showComments &&
            //         <ScrollView style={container}>
            //             <Container style={{flexDirection:"row", height: 60}}>
            //                 <View style={{width: '80%', marginLeft: 10}}>
            //                     <InputGroup borderType="rounded" >
            //                         <Input onChangeText={(text)=>this.handleCommentChange(text)} value={this.props.comment}/>
            //                     </InputGroup>
            //                 </View>
            //                 <View style={{justifyContent: 'center'}}>
            //                     <Button onPress={()=>this.submitNewComment()} style={{width: 40, height: 32, justifyContent: 'center'}} >
            //                         <Icon
            //                             name='send' color="white" />
            //                     </Button>
            //                 </View>
            //             </Container>
            //             <CommentsList />
            //         </ScrollView>
            //         }
            // </Container>
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
