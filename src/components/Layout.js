import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
  return (
   
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '50%vh',
          '& > *': {
            margin: 0, // Reset margin for all direct children
            padding: 0, // Reset padding for all direct children
          },
        }}
      >
        <Header/>
        {children}
      </Box>
 
  );
};

export default Layout;