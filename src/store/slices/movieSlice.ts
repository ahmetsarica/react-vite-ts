import { createSlice } from '@reduxjs/toolkit';

interface stateProps {
  movies: Movie[];
  totalResult: number;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const initialState: stateProps = {
  movies: [],
  totalResult: 0,
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setTotalResult: (state, action) => {
      state.totalResult = action.payload;
    },
  },
});

export const { setMovies, setTotalResult } = movieSlice.actions;

export default movieSlice.reducer;
