import React from 'react'
import Layout from '../Common/Layout'
import Teams from '../Components/Teams'
import ImageHeader from '../Images/ImageHeader'
import { Typography } from '@mui/material'

export default function TeamPages() {
  return (
    <Layout>
        <ImageHeader />
        <Typography variant='h3' align='center' style={{ marginTop: "-210px", fontWeight: "bold", color : "white" }}>
                                Our Team
                            </Typography>

        <Teams />
    
    </Layout>
  )
}
