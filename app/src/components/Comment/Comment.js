import React, { Component } from 'react';
import {
    Header,
    Item,
    Input,
    Icon,
    Button,
    Spinner,
    Grid,
    Col,
    Row,
    StyleProvider,
    Fab,
    Card,
    CardItem,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { Content, View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';

import {
    handle_delete_comment,
    handle_update_comment,
} from '../../ducks/post';
import styles from './styles';
const {
    commentContainer,
} = styles;
class CommentComponent extends Component {
    // handleUpdateComment = (id) => {
    //   const oldComment = this.props.data.find(c => c._id === id);
    //   if (!oldComment) return;
    //   this.props.handle_update_comment(oldComment.body, id);
    // }
    render() {
        console.log(this.props.text);
        // const oldComment = this.props.data.find(c => c._id === this.props.id);
        return (
            <View style={commentContainer} borderRadius={10}>
                <Text>{this.props.text}</Text>
            </View>
        );
    }

}


export { CommentComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { data } = post;
    return {
        ...ownProps,
        data
    };
};

export const Comment = connect(mapStateToProps, {
    handle_delete_comment,
    handle_update_comment
})(CommentComponent);