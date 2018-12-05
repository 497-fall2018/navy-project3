import _ from 'lodash';
import axios from 'axios';

//Action Types
export const LOADED_FONTS = 'buyornah/post/LOADED_FONTS';
export const HANDLE_COMMENT_CHANGE = 'buyornah/post/HANDLE_COMMENT_CHANGE';
export const HANDLE_SWIPE_DOWN = 'buyornah/post/HANDLE_SWIPE_DOWN';
export const HANDLE_SWIPE_UP = 'buyornah/post/HANDLE_SWIPE_UP';
export const SUBMIT_NEW_COMMENT = 'buyornah/post/SUBMIT_NEW_COMMENT';
export const SUBMIT_NEW_COMMENT_SUCCESS = 'buyornah/post/SUBMIT_NEW_COMMENT_SUCCESS';
export const SUBMIT_NEW_COMMENT_FAILURE = 'buyornah/post/SUBMIT_NEW_COMMENT_FAILURE';


const INITIAL_STATE = {
    loading: true,
    showComments: false,
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
    error_message: ""
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
        case SUBMIT_NEW_COMMENT:
        case SUBMIT_NEW_COMMENT_SUCCESS:
            if (action.payload) {
                return {
                    ...state,
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

export const submit_new_comment = (cmt, curr_post_id) => {
    console.log("submitting new comment")
    return (dispatch) => {
        dispatch({
                type: SUBMIT_NEW_COMMENT,
        });
        axios.post(`http://192.168.1.66:3001/api/post/${curr_post_id}`, { //https://stackoverflow.com/questions/42189301/axios-in-react-native-not-calling-server-in-localhost
            "text": cmt
        })
          .then((response) => submit_new_comment_success(dispatch, response))
          .catch((error) => submit_new_comment_failure(dispatch, error))
    }
}

export const submit_new_comment_success = (dispatch, response) => {
    console.log(response)
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
