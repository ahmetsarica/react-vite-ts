import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import './Movie.scss';
import Progress from '../progress/Progress';

// Define the interface for MovieProps
interface MovieProps {
  id: string;
}

// Define constants for API URL and API KEY
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Function to fetch movie details from the API
const fetchMovieDetail = async (id: string) => {
  const url = `${API_URL}?i=${id}&apikey=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Movie component
const Movie = (props: MovieProps) => {
  const { id } = props;

  // UseQuery hook to fetch movie data
  const {
    data: movieData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetail(id),
  });

  // Display progress if data is loading
  if (isLoading) return <Progress />;
  // Display error if there's an error fetching data
  if (error) return <Typography>Error fetching movie details</Typography>;

  // Display movie details if data is available
  return (
    <Container maxWidth='sm' sx={{ my: 4 }}>
      <Card sx={{ maxWidth: 500 }}>
        <CardMedia
          component='img'
          height='240'
          image={movieData?.Poster}
          alt={movieData?.Title}
        />
        <CardContent className='info-container'>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
            className='bold'
          >
            {movieData?.Title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {movieData?.Plot}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span className='bold'>Actors:</span> {movieData?.Actors}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span className='bold'>Director:</span> {movieData?.Director}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span className='bold'>Genre:</span> {movieData?.Genre}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span className='bold'>Released:</span> {movieData?.Released}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span className='bold'>Runtime:</span> {movieData?.Runtime}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            <span className='bold'>IMDB Rating:</span> {movieData?.imdbRating}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Movie;
