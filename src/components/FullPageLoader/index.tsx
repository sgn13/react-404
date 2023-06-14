import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
// import './index.scss';

const index = () => {
  return (
    <Box className="fullpage__loader" sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default index;
