import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000/users",
});

const initialState = {
  currentUser: localStorage.getItem("user"),
  users: [],
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action) {
      state.users.unshift(action.payload);
    },
    getUsers(state, action) {
      state.users = action.payload;
    },
    addCurrentUser(state) {
      state.currentUser = localStorage.getItem("user");
    },
    addActivity(state, { payload }) {
      state.users.find((element) => element.id === payload.id).activity =
        payload.activity;
    },
    addNotification(state, { payload }) {
      state.users.find((element) => element.id === payload.id).notifications =
        payload.notifications;
      state.users.find((element) => element.id === payload.id)
        .notificationCounter++;
    },
    removeNotification(state, { payload }) {
      state.users.find(
        (element) => element.id === payload.id
      ).notificationCounter = 0;
    },
    sortByUserActivity(state) {
      state.users.sort((a, b) => {
        if (a.activity.length > b.activity.length) return -1;
        if (b.activity.length > a.activity.length) return 1;
      });
    },
    changeEmail(state, { payload }) {
      state.users.find((element) => element.id === payload.id).email =
        payload.email;
    },
    changePassword(state, { payload }) {
      state.users.find((element) => element.id === payload.id).password =
        payload.password;
    },
  },
});
export const usersAction = usersSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    dispatch(usersAction.getUsers(data));
  };
};
export const addUser = async (dispatch, data) => {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(usersAction.addUser(await response.json()));
};

export const changeUserName = async (dispatch, user) => {
  const response = await fetch(`http://localhost:5000/users/${user.id}`, {
    method: "PATCH",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const addActivity = async (dispatch, data) => {
  instance
    .patch(`${data.id}`, data)
    .then((res) => dispatch(usersAction.addActivity(data)));
};
export const addNotification = async (dispatch, data) => {
  instance.patch(`${data.id}`, data).then((res) => {
    dispatch(usersAction.addNotification(data));
  });
};
export const removeNotification = async (dispatch, data) => {
  instance.patch(`${data.id}`, data).then((res) => {
    dispatch(usersAction.removeNotification(data));
  });
};
export const changeEmail = async (dispatch, data) => {
  instance.patch(`${data.id}`, data).then((res) => {
    dispatch(usersAction.changeEmail(data));
  });
};
export const changePassword = async (dispatch, data) => {
  instance.patch(`${data.id}`, data).then((res) => {
    dispatch(usersAction.changePassword(data));
  });
};
