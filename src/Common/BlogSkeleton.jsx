import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export default function BlogSkelton() {
  return (
    <Stack spacing={1}>

      <Box component="div" padding={3} sx={{display : "flex", justifyContent : "center"}}>
        <Skeleton animation="wave"  variant="rectangular" width="95vw" height={360} />

        
      </Box>

      <Box component="div" sx={{display : "flex", flexDirection: "row", justifyContent : "center", columnGap: "55px"}} >
        <Skeleton animation="wave"  variant="rectangular" width="650px" height={650} />
        <Skeleton animation="wave"  variant="rectangular" width="350px" height={650} />

        </Box>

    </Stack>
  );
} 