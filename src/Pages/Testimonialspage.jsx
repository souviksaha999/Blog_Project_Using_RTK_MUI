import React from 'react'
import Layout from '../Common/Layout'
import Testimonials from '../Components/Testimonials'
import ImageHeader from '../Images/ImageHeader'
import { Typography } from '@mui/material'

export default function Testimonialspage() {
  return (
    <Layout>
        <ImageHeader />

        <Typography variant='h3' align='center' style={{ marginTop: "-210px", fontWeight: "bold", color : "white" }}>
                                Testimonials
                            </Typography>

        <Testimonials />
    
    </Layout>
  )
}
