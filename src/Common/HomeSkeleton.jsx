import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export default function HomeSkelton() {
  return (
    <Stack spacing={1}>

      <Box component="div" padding={5} sx={{display : "flex", justifyContent : "center"}}>
        <Skeleton animation="wave"  variant="rectangular" width="95vw" height={520} />

        
      </Box>

      <Box component="div" sx={{display : "flex", flexDirection: "row", justifyContent : "center", columnGap: "55px"}} >
        <Skeleton animation="wave"  variant="rectangular" width="350px" height={350} />
        <Skeleton animation="wave"  variant="rectangular" width="350px" height={350} />
        <Skeleton animation="wave"  variant="rectangular" width="350px" height={350} />

        </Box>

    </Stack>
  );
} 