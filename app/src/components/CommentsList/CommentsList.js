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
import { View, Text, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Comment } from '../Comment';
import styles from './styles';
import {
} from '../../ducks/post'

const {

} = styles;

class CommentsListComponent extends Component {
    render() {
        console.log(this.props.comments)
        const commentNodes = (this.props.comments).map(comment => (
            <Comment
              text={comment.text}
              key={comment._id}
              id={comment._id}
            >
            </Comment>
        ));

        return (
            <ScrollView>
                {commentNodes}
            </ScrollView>
        );
    }
}

export { CommentsListComponent };

const mapStateToProps = (state, ownProps) => {
    const { post } = state;
    const { comments } = post;
    return {
        ...ownProps,
        comments
    };
};

export const CommentsList = connect(mapStateToProps, {
})(CommentsListComponent);
