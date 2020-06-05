import * as types from './types';

const getAllPosts = data => ({
    type: types.GET_ALL_POSTS,
    data,
});
  
const posts = () => {
    const action = async dispatch => {
        return dispatch(getAllPosts());
    };
    return action;
};

export {posts, getAllPosts};
  