import { configureStore } from "@reduxjs/toolkit";
import { postsSlice } from "./posts";
import { usersSlice } from "./users";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
  },
});
export default store;
