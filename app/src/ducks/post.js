import _ from 'lodash';
import axios from 'axios';

//Action Types
export const LOADED_FONTS = 'buyornah/post/LOADED_FONTS';
export const HANDLE_SWIPE_DOWN = 'buyornah/post/HANDLE_SWIPE_DOWN';
export const HANDLE_SWIPE_UP = 'buyornah/post/HANDLE_SWIPE_UP';
export const HANDLE_SWIPE_LEFT = 'buyornah/post/HANDLE_SWIPE_LEFT';
export const HANDLE_SWIPE_RIGHT = 'buyornah/post/HANDLE_SWIPE_RIGHT';


const INITIAL_STATE = {
    loading: true,
    showComments: false,
};


//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADED_FONTS:
            return {
                ...state,
                loading: false,
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
        case HANDLE_SWIPE_RIGHT:
            return {
                ...state
            }
        case HANDLE_SWIPE_LEFT:
            return {
                ...state
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

export const handle_swipe_left = () => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_SWIPE_LEFT
        })
    }
}
export const handle_swipe_right = () => {
    return (dispatch) => {
        dispatch({
            type: HANDLE_SWIPE_RIGHT
        })
    }
}
