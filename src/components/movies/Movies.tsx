import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

import {
  Table,
  Container,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Box,
} from '@mui/material';

import { setMovies, setTotalResult } from '../../store/slices/movieSlice';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import './Movies.scss';
import Progress from '../progress/Progress';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Enum for defining media types
enum MediaType {
  MOVIE = 'movie',
  TV_SERIES = 'series',
  TV_EPISODES = 'episode',
}

const Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // INSTEAD OF GETTING THE RECENTLY FETCHED DATA FROM STORE, I COULD USE THE FETCHED DATA BUT THEN WE WOULDN'T NEED THE STORE
  // SINCE THIS IS AN INTERVIEW CASE AND USING REDUX IS A PLUS, I'M USING THE STORE DATA
  const movies = useSelector((state: RootState) => state.movie.movies);
  const totalResults = useSelector(
    (state: RootState) => state.movie.totalResult
  );

  const [keyword, setKeyword] = useState('Pokemon');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(0);

  // Function to fetch movies from the API
  const fetchMovies = async (searchKeyword: string) => {
    const url = `${API_URL}?page=${
      page + 1
    }&apikey=${API_KEY}&s=${searchKeyword}&y=${year}&type=${type}`;
    const response = await fetch(url);
    const moviesData = await response.json();
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    dispatch(setMovies(moviesData.Search || []));
    dispatch(setTotalResult(parseInt(moviesData.totalResults) || 0));
    return moviesData.Search || [];
  };

  // Using Lodash to debounce the fetchMovies function
  const debouncedFetchMovies = useRef(_.debounce(fetchMovies, 600)).current;

  // Using useQuery to handle fetching movies with debouncing
  const {
    // data:movieData can be used instead of getting the data from the store
    // so I'm disabling the eslint rules for that line and keeping it
    // eslint-disable-next-line
    data: movieData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['movies', year, type, page],
    queryFn: () => fetchMovies(keyword),
  });

  if (isLoading) return <Progress />;
  if (error) return <Typography>Error fetching movie details</Typography>;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setKeyword(e.target.value);
    debouncedFetchMovies(e.target.value);
  };

  const handleRowClick = (imdbID: string) => {
    navigate(`/detail/${imdbID}`);
  };

  return (
    <Container className='container' maxWidth='sm' sx={{ my: 4 }}>
      {/* Box component doesnt accept a class using sx is the best practice here  */}
      <Box
        sx={{
          width: '700px',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <TextField
          label='Search'
          type='text'
          variant='outlined'
          sx={{ width: '200px' }}
          value={keyword}
          onChange={(e) => handleSearch(e)}
        />
        <FormControl sx={{ width: '200px' }}>
          <InputLabel>Year</InputLabel>
          <Select
            labelId='year-select-label'
            value={year}
            label='Year'
            onChange={(e) => setYear(e.target.value)}
          >
            <MenuItem value=''>Please select</MenuItem>
            {[...Array(100)].map((_, index) => (
              <MenuItem key={index} value={2022 - index}>
                {2022 - index}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel>Type</InputLabel>
          <Select
            labelId='type-select-label'
            value={type}
            label='Type'
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value=''>Please select</MenuItem>
            <MenuItem value={MediaType.MOVIE}>Movie</MenuItem>
            <MenuItem value={MediaType.TV_SERIES}>TV Series</MenuItem>
            <MenuItem value={MediaType.TV_EPISODES}>TV Episodes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: '700px' }}>
        <Paper sx={{ width: '700px', mb: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell className='bold'>Title</TableCell>
                  <TableCell className='bold' align='center'>
                    Year
                  </TableCell>
                  <TableCell className='bold' align='center'>
                    ImdbID
                  </TableCell>
                  <TableCell className='bold' align='center'>
                    Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(movies || []).slice(0, 10).map((movie, index) => (
                  <TableRow
                    key={movie.imdbID}
                    className={`table-row ${index % 2 === 0 ? '' : 'odd'}`}
                    onClick={() => handleRowClick(movie.imdbID)}
                  >
                    <TableCell component='th' scope='row'>
                      {movie.Title}
                    </TableCell>
                    <TableCell align='center'>{movie.Year}</TableCell>
                    <TableCell align='center'>{movie.imdbID}</TableCell>
                    <TableCell align='center'>{movie.Type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component='div'
            count={totalResults}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Movies;
