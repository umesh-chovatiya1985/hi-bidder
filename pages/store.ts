import { configureStore } from '@reduxjs/toolkit';
import photoReducer from '../Reducer/reducer';

export const store = configureStore({
  reducer: {
    auctionphoto: photoReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;