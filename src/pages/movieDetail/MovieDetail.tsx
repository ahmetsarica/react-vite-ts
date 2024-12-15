import React from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../../components/movie/Movie';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <Movie id={id || ''} />
    </div>
  );
};

export default MovieDetail;
