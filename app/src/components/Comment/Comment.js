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
import moment from 'moment';

import {
    handle_change,
    handle_delete_post,
    handle_update_post,
} from '../../ducks/post';
import styles from './styles';

class CommentComponent extends Component {
    handleUpdateComment = (id) => {
      const oldComment = this.props.data.find(c => c._id === id);
      if (!oldComment) return;
      this.props.handle_update_post(oldComment.body, id);
    }
    render() {
        console.log(this.props.id);
        const oldComment = this.props.data.find(c => c._id === this.props.id);
        return(
            <Container className="singleComment">
              <Container className="commentHeader">
                <Container className="singleCommentButtons">
                    <span className="time">{moment(this.props.timestamp).fromNow()}</span>
                    <span>
                      <a onClick={() => { this.handleUpdateComment(this.props.id); }}>update</a>
                      <a onClick={() => { this.props.handle_delete_post(this.props.id); }}>delete</a>
                    </span>
                </Container>
              </Container>
              <Container className="textContent">
                <span className="singleCommentContent"><h3>{this.props.body}</h3></span>
              </Container>
            </Container>
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
    handle_change,
    handle_delete_post,
    handle_update_post
})(CommentComponent);
