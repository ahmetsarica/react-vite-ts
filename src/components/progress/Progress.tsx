import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Progress = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height of the viewport
      }}
    >
      <CircularProgress size='6rem' />
    </Box>
  );
};

export default Progress;
