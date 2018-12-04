import React, { Component } from 'react';
import Comments from 'react-native-comments';
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
import styles from './styles';


const {

} = styles;

class CommentsListComponent extends Component {
    render() {
        const commentNodes = (this.props.data).map(comment => (
            <Comment
              body={comment.body}
              key={comment._id}
              id={comment._id}
              timestamp={comment.updatedAt}
            >
            </Comment>

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
    const { data } = post;
    return {
        ...ownProps,
        data
    };
};

export const CommentsList = connect(mapStateToProps, {
})(CommentsListComponent);
