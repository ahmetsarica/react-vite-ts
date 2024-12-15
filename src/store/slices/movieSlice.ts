import { createSlice } from '@reduxjs/toolkit';

// Define the state interface
interface stateProps {
  movies: Movie[];
  totalResult: number;
}

// Define the movie interface
export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Define the initial state
const initialState: stateProps = {
  movies: [],
  totalResult: 0,
};

// Create the movie slice
export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    // Reducer to set the movies
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    // Reducer to set the total result
    setTotalResult: (state, action) => {
      state.totalResult = action.payload;
    },
  },
});

// Export the actions
export const { setMovies, setTotalResult } = movieSlice.actions;

// Export the reducer
export default movieSlice.reducer;
