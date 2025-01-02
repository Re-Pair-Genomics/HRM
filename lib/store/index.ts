import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user';

export const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer
        }
    });

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof makeStore>;
