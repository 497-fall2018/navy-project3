import _ from 'lodash';
import axios from 'axios';

//Action Types
export const LOAD_POSTS = 'buyornah/post/LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'buyornah/post/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'buyornah/post/LOAD_POSTS_FAILURE';
export const LOADED_FONTS = 'buyornah/post/LOADED_FONTS';
export const HANDLE_COMMENT_CHANGE = 'buyornah/post/HANDLE_COMMENT_CHANGE';
export const HANDLE_SWIPE_DOWN = 'buyornah/post/HANDLE_SWIPE_DOWN';
export const HANDLE_SWIPE_UP = 'buyornah/post/HANDLE_SWIPE_UP';
export const TOGGLE_FULL_TEXT = 'buyornah/post/TOGGLE_FULL_TEXT';
export const SUBMIT_NEW_COMMENT = 'buyornah/post/SUBMIT_NEW_COMMENT';
export const SUBMIT_NEW_COMMENT_SUCCESS = 'buyornah/post/SUBMIT_NEW_COMMENT_SUCCESS';
export const SUBMIT_NEW_COMMENT_FAILURE = 'buyornah/post/SUBMIT_NEW_COMMENT_FAILURE';
export const SUBMIT_NEW_VOTE_BUY = 'buyornah/post/SUBMIT_NEW_VOTE_BUY';
export const SUBMIT_NEW_VOTE_BUY_SUCCESS = 'buyornah/post/SUBMIT_NEW_VOTE_BUY_SUCCESS';
export const SUBMIT_NEW_VOTE_BUY_FAILURE = 'buyornah/post/SUBMIT_NEW_VOTE_BUY_FAILURE';
export const SUBMIT_NEW_VOTE_NAH = 'buyornah/post/SUBMIT_NEW_VOTE_NAH';
export const SUBMIT_NEW_VOTE_NAH_SUCCESS = 'buyornah/post/SUBMIT_NEW_VOTE_NAH_SUCCESS';
export const SUBMIT_NEW_VOTE_NAH_FAILURE = 'buyornah/post/SUBMIT_NEW_VOTE_NAH_FAILURE';

const INITIAL_STATE = {
    loading: true,
    showComments: false,
    posts: [{
            "_id": "5c0606d1a1cf240319197af4",
            "title": "Cool Watch",
            "description": "Should I get this for my friend?",
            "comments": [
                {
                    "_id": "5c060786063fa80335dd2cd2",
                    "text": "Yes get it! It's at a really good price!"
                },
            ],
            "__v": 1,
            "buy": 3,
            "nah": 1
        },{
                "_id": "5c0606d1a1cf240319197af5",
                "title": "car",
                "description": "ohoh",
                "comments": [
                    {
                        "_id": "5c060786063fa80335dd2cd3",
                        "text": "TT"
                    },
                ],
                "__v": 1,
                "buy": 0,
                "nah": 10
            }],
    curr_post_id: "5c0606d1a1cf240319197af4",
    comments:
        [{
            "_id": "0",
            "text": "It looks v nice!"
        },
        {
            "_id": "1",
            "text": "I think your dad will love it :)"
        }],
    comment: "",
    error_message: "",
    showFullText: false,
    post_index: 0,
};


//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADED_FONTS:
            return {
                ...state,
                loading: false,
            }
        case HANDLE_COMMENT_CHANGE:
            return {
                ...state,
                comment: action.payload,
            }
        case HANDLE_SWIPE_DOWN:
            return {
                ...state,
                showComments: false,
            }
        case HANDLE_SWIPE_UP:
            return {
                ...state,
                showComments: true,
            }
        case LOAD_POSTS:
        case LOAD_POSTS_SUCCESS:
            if (action.payload) {
                // console.log(action.payload.data)
                return {
                    ...state,
                    posts: action.payload.data,
                    curr_post_id: action.payload.data[0]["_id"],
                    comments: action.payload.data[0]["comments"]
                }
            }
        case LOAD_POSTS_FAILURE:
            return {
                ...state,
                error_message: "Something went wrong while loading the posts. ",
            }
        case SUBMIT_NEW_COMMENT:
        case SUBMIT_NEW_COMMENT_SUCCESS:
            if (action.payload) {
                var old_cmt = state.comments;
                old_cmt.push({"_id": Date.now().toString(), "text": state.comment});
                return {
                    ...state,
                    comments: old_cmt,
                    comment: "",

                }
            } else {
                return {
                    ...state,
                }
            }
        case SUBMIT_NEW_COMMENT_FAILURE:
            return {
                ...state,
                error_message: "Something went wrong while submitting a new comment.",
            }
        case TOGGLE_FULL_TEXT:
            return {
                ...state,
                showFullText: !state.showFullText
            }
        case SUBMIT_NEW_VOTE_BUY:
        case SUBMIT_NEW_VOTE_BUY_SUCCESS:
            if (action.payload) {
                let post = state.posts.filter(x => x['_id'] === state.curr_post_id);
                post['buy'] = post['buy'] + 1;
                return {
                    ...state,
                    posts: [...state.posts, post]
                }
            } else {
                return {
                    ...state,
                }
            }
        case SUBMIT_NEW_VOTE_BUY_FAILURE:
            return {
                ...state,
                error_message: "Something went wrong while submitting a buy vote.",
            }
        case SUBMIT_NEW_VOTE_NAH:
        case SUBMIT_NEW_VOTE_NAH_SUCCESS:
            if (action.payload) {
                let post = state.posts.filter(x => x['_id'] === state.curr_post_id);
                post['nah'] = post['nah'] + 1;
                return {
                    ...state,
                    posts: [...state.posts, post]
                }
            } else {
                return {
                    ...state,
                }
            }
        case SUBMIT_NEW_VOTE_NAH_FAILURE:
            return {
                ...state,
                error_message: "Something went wrong while submitting a nah vote.",
            }
        default:
            return state;
    }
}


//Action Creators
export const loaded_fonts = () => {
    return (dispatch) => {
        dispatch({
            type: LOADED_FONTS
        })
    }
}
export const handle_comment_change = (cmt) => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_COMMENT_CHANGE,
            payload: cmt
        })
    }
}
export const handle_swipe_down = () => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_SWIPE_DOWN
        })
    }
}
export const handle_swipe_up = () => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_SWIPE_UP
        })
    }
}

export const load_posts = () => {
    console.log("loading posts")
    return (dispatch) => {
        dispatch({
            type: LOAD_POSTS,
        });
        axios.get(`http://10.105.236.104:3001/api/post/`)
          .then((response) => load_posts_success(dispatch, response))
          .catch((error) => load_posts_failure(dispatch, error))
    }
}

export const load_posts_success = (dispatch, response) => {
    dispatch({
        type: LOAD_POSTS_SUCCESS,
        payload: response.data,
    });
}

export const load_posts_failure = (dispatch, error) => {
    dispatch({
        type: LOAD_POSTS_FAILURE,
    });
}

export const submit_new_comment = (cmt, curr_post_id) => {
    console.log("submitting new comment to " + curr_post_id)
    return (dispatch) => {
        dispatch({
                type: SUBMIT_NEW_COMMENT,
        });
        axios.post(`http://10.105.236.104:3001/api/post/${curr_post_id}`, { //https://stackoverflow.com/questions/42189301/axios-in-react-native-not-calling-server-in-localhost
            "text": cmt
        })
          .then((response) => submit_new_comment_success(dispatch, response))
          .catch((error) => submit_new_comment_failure(dispatch, error))
    }
}
export const submit_new_comment_success = (dispatch, response) => {
    dispatch({
        type: SUBMIT_NEW_COMMENT_SUCCESS,
        payload: response.data,
    });
}
export const submit_new_comment_failure = (dispatch, error) => {
    console.log(error)
    dispatch({
        type: SUBMIT_NEW_COMMENT_FAILURE,
    });
}

export const submit_new_vote_buy = (buy_vote, curr_post_id) => {
    return (dispatch) => {
        dispatch({
                type: SUBMIT_NEW_VOTE_BUY,
        });
        axios.post(`http://10.105.236.104:3001/api/post/${curr_post_id}`, { //https://stackoverflow.com/questions/42189301/axios-in-react-native-not-calling-server-in-localhost
            "buy": buy_vote
        })
          .then((response) => submit_new_vote_buy_success(dispatch, response))
          .catch((error) => submit_new_vote_buy_failure(dispatch, error))
    }
}
export const submit_new_vote_buy_success = (dispatch, response) => {
    dispatch({
        type: SUBMIT_NEW_VOTE_BUY_SUCCESS,
        payload: response.data,
    });
}
export const submit_new_vote_buy_failure = (dispatch, error) => {
    dispatch({
        type: SUBMIT_NEW_VOTE_BUY_FAILURE,
    });
}

export const submit_new_vote_nah = (nah_vote, curr_post_id) => {
    return (dispatch) => {
        dispatch({
                type: SUBMIT_NEW_VOTE_NAH,
        });
        axios.post(`http://10.105.236.104:3001/api/post/${curr_post_id}`, { //https://stackoverflow.com/questions/42189301/axios-in-react-native-not-calling-server-in-localhost
            "nah": nah_vote
        })
          .then((response) => submit_new_vote_nah_success(dispatch, response))
          .catch((error) => submit_new_vote_nah_failure(dispatch, error))
    }
}
export const submit_new_vote_nah_success = (dispatch, response) => {
    dispatch({
        type: SUBMIT_NEW_VOTE_NAH_SUCCESS,
        payload: response.data,
    });
}
export const submit_new_vote_nah_failure = (dispatch, error) => {
    dispatch({
        type: SUBMIT_NEW_VOTE_NAH_FAILURE,
    });
}

export const toggle_full_text = () => {
    return (dispatch) => {
        dispatch({
            type: TOGGLE_FULL_TEXT
        })
    }
}
