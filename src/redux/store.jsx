import { configureStore } from "@reduxjs/toolkit";
import UsersReducer from './users/UsersSlice';
import PostsReducer from './posts/PostsSlice';

const store = configureStore({
    reducer:{
        users: UsersReducer,
        posts: PostsReducer
    }
});

export default store;