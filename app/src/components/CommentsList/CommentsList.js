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
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            comments: [{
                "parentId": null,
                "commentId": 1,
                "name": "id labore ex et quam laborum",
                "liked": true,
                "reported": false,
                "likes": [

                ],
                "email": "testUser",
                "created_at": "2017-12-23 14:45:06",
                "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
                "children": [
                    {
                        "parentId": 1,
                        "commentId": 2,
                        "name": "quo vero reiciendis velit similique earum",
                        "created_at": "2017-12-23 14:45:06",
                        "liked": true,
                        "reported": false,
                        "likes": [

                        ],
                        "email": "Jayne_Kuhic@sydney.com",
                        "body": "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
                    },
                    {
                        "parentId": 1,
                        "commentId": 3,
                        "name": "odio adipisci rerum aut animi",
                        "created_at": "2017-12-23 14:45:06",
                        "liked": false,
                        "reported": true,
                        "likes": [
                            {
                                "username": "someUser",
                                "user_id": 345,
                                "image": "https://ireview.live/img/no-user.png"
                            }
                        ],
                        "email": "Nikita@garfield.biz",
                        "body": "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
                    },
                ]
            },],
            loadingComments: true,
            login: {"user": "USERUSER"},
        }
        this.scrollIndex = 0

    }

    extractUsername (c) {
        try {
            return c.user && c.user.username && c.user.username !== '' ? JSON.parse(c.user.username) : null
        } catch (e) {
            console.log(e)
        }
    }

    extractBody (c) {
        try {
            return c.body && c.body !== '' ? JSON.parse(c.body) : null
        } catch (e) {
            console.log(e)
        }
    }

    extractChildrenCount (c) {
        try {
            return c.childrenCount || 0
        } catch (e) {
            console.log(e)
        }
    }

    extractEditTime (item) {
        try {
            return item.updated_at
        } catch (e) {
            console.log(e)
        }
    }

    extractCreatedTime (item) {
        try {
            return item.created_at
        } catch (e) {
            console.log(e)
        }
    }

    likeExtractor (item) {
        return item.liked
    }

    reportedExtractor (item) {
        return item.reported
    }

    likesExtractor (item) {
        return item.likes.map((like) => {
            return {
                image: this.config.urls.api_url+'/data/images/users/'+like.user_id+'/'+like.user.image,
                name: JSON.parse(like.user.name),
                user_id: like.user_id,
                tap: (username) => {
                    this.props.navigator.showModal({
                        screen: "M.Profile",
                        passProps: {profileUsername: username},
                        title: username})
                    }
                }
            })
    }

    isCommentChild(item){
        return  item.parent !== null
    }
    render() {
        const data = this.state.comments

        return (
            <ScrollView
                style={styles.container}
                onScroll={(event) => {
                    this.scrollIndex = event.nativeEvent.contentOffset.y
                }}
                ref={'scrollView'}>
                {this.state.comments.length ?
                    <Comments
                        data={data}
                        viewingUserName={this.state.login.user ? this.state.login.user.username : ""}
                        initialDisplayCount={10}
                        editMinuteLimit={900}
                        childrenPerPage={5}
                        lastCommentUpdate={this.state.lastCommentUpdate}
                        usernameTapAction={username => this.props.navigator.showModal({
                            screen: 'M.Profile',
                            passProps: {
                                profileUsername: username,
                                title: username
                            }
                        })
                    }
                    childPropName={'children'}
                    isChild={() =>this.isCommentChild(item)}
                    keyExtractor={item => item.comment_id}
                    usernameExtractor={item => this.extractUsername(item)}
                    editTimeExtractor={item => this.extractEditTime(item)}
                    createdTimeExtractor={item => this.extractCreatedTime(item)}
                    bodyExtractor={item => this.extractBody(item)}
                    likeExtractor={item => this.likeExtractor(item)}
                    reportedExtractor={item => this.reportedExtractor(item)}
                    likesExtractor={item => this.likesExtractor(item)}
                    childrenCountExtractor={item => this.extractChildrenCount(item)}
                    timestampExtractor={item => item.updated_at}
                    replyAction={offset => {
                        this.refs.scrollView.scrollTo({x: null, y: this.scrollIndex + offset - 300, animated: true})
                    }}
                    saveAction={(text, parentCommentId) => {
                        this.props.actions.save(this.props.id, text, 'review', parentCommentId)
                    }}
                    editAction={(text, comment) => {
                        this.props.actions.edit(this.props.id, comment, text)
                    }}
                    reportAction={(comment) => this.props.actions.report(this.props.id, comment)}
                    likeAction={(comment) => {
                        this.props.actions.like(this.props.id, comment)
                    }
                }
                paginateAction={(from_comment_id, direction, parent_comment_id) => {
                    this.props.actions.paginateComments(
                        review.review_id,
                        'review',
                        from_comment_id,
                        direction,
                        parent_comment_id)
                        let self = this
                        setTimeout(function () {
                            self.refs.scrollView.scrollTo(500)
                        }, 3000)

                    }
                }
                /> : null}

            </ScrollView>
        );
    }
}

export { CommentsListComponent };

const mapStateToProps = (state, ownProps) => {

    return {
        ...ownProps,
    };
};

export const CommentsList = connect(mapStateToProps, {
})(CommentsListComponent);
