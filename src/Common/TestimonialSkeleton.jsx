import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';

export default function TestimonialSkeleton() {
    return (
        <Stack spacing={1}>

            <Box component="div" padding={3} sx={{ display: "flex", justifyContent: "center" }}>
                <Skeleton animation="wave" variant="rectangular" width="95vw" height={360} />

            </Box>

            <Box component="div" sx={{ display: "flex", flexDirection: "row", justifyContent: "center", columnGap: "55px" }} >
                
                <Stack spacing={0.5}>
                    <Skeleton animation="wave" variant="rectangular" width="350px" height={250} />
                    <Stack spacing={0.5}>
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />

                    </Stack>
                </Stack>

                <Stack spacing={0.5}>
                    <Skeleton animation="wave" variant="rectangular" width="350px" height={250} />
                    <Stack spacing={0.5}>
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />

                    </Stack>
                </Stack>

                <Stack spacing={0.5}>
                    <Skeleton animation="wave" variant="rectangular" width="350px" height={250} />
                    <Stack spacing={0.5}>
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem' }} />

                    </Stack>
                </Stack>

            </Box>

        </Stack>

        
        
    );
}
TestimonialSkeleton