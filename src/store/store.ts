import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
// Import other reducers if needed

const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
