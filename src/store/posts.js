import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/posts",
});

const initialState = {
  posts: [],
  filteredPosts: [],
};
export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, { payload }) {
      state.posts.unshift(payload);
      state.filteredPosts = state.posts;
    },
    getPosts(state, { payload }) {
      state.filteredPosts = state.posts = payload.reverse();
      // state.filteredPosts = payload.reverse();
      state.filteredPosts = state.posts;
    },
    removePost(state, { payload }) {
      state.posts = state.posts.filter((element) => element.id !== +payload);
      state.filteredPosts = state.posts;
    },
    addLike(state, { payload }) {
      state.posts.find((element) => element.id === +payload.id).likes =
        payload.likes;
      state.filteredPosts = state.posts;
    },
    postComment(state, { payload }) {
      state.posts.find((element) => element.id === payload.id).comments =
        payload.comments;
      state.filteredPosts = state.posts;
    },
    deletePost(state, { payload }) {
      state.posts = state.posts.filter((element) => element.id !== payload.id);
      state.filteredPosts = state.posts;
    },
    editPost(state, { payload }) {
      state.posts.find((element) => element.id === payload.id).content =
        payload.content;
      state.filteredPosts = state.posts;
    },
    sortByTime(state) {
      state.posts.sort((a, b) => {
        if (a.timestamp > b.timestamp) return -1;
        if (b.timestamp > a.timestamp) return 1;
      });
      state.filteredPosts = state.posts;
    },
    sortByComments(state) {
      state.posts.sort((a, b) => {
        if (a.comments.length > b.comments.length) return -1;
        if (b.comments.length > a.comments.length) return 1;
      });
      state.filteredPosts = state.posts;
    },
    searchPost(state, { payload }) {
      state.filteredPosts = state.posts.filter(
        (element) =>
          element.user?.includes(payload) || element.content.includes(payload)
      );
    },
  },
});
export const postsAction = postsSlice.actions;
export const getPosts = (dispatch) => {
  instance.get().then((reponse) => {
    dispatch(postsAction.getPosts(reponse.data));
  });
};
export const addPost = async (dispatch, post) => {
  instance
    .post("", post)
    .then((response) => dispatch(postsAction.addPost(response.data)));
};
export const removePost = async (dispatch, id) => {
  instance
    .delete(`${id}`)
    .then((response) => dispatch(postsAction.removePost(id)));
};
export const addLike = (dispatch, data) => {
  instance
    .patch(`${data.id}`, data)
    .then((response) => dispatch(postsAction.addLike(data)));
};
export const postComment = async (dispatch, data) => {
  instance
    .patch(`${data.id}`, data)
    .then((response) => dispatch(postsAction.postComment(data)));
};
export const deletePost = async (dispatch, data) => {
  instance.delete(`${data.id}`).then((res) => {
    dispatch(postsAction.deletePost(data));
  });
};
export const editPost = async (dispatch, data) => {
  instance
    .patch(`${data.id}`, data)
    .then((response) => dispatch(postsAction.editPost(data)));
};
