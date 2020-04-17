import * as types from './types';

import AsyncStorage from '@react-native-community/async-storage';

import Parse from 'parse/react-native';

const getAllPosts = data => ({
    type: types.GET_ALL_POST,
    data,
});
  
const posts = () => {
    const action = async dispatch => {
        return dispatch(getAllPosts());
    };
    return action;
};

export {posts, getAllPosts};
  