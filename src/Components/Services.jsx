import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { servicesFetch } from '../Redux/ServicesSlice'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import Loader from '../Common/Loader'
import { toast } from 'react-toastify'

import Aos from 'aos'
import 'aos/dist/aos.css'
import ImageHeader from '../Images/ImageHeader'


export default function Services() {

    useEffect(()=>{
        Aos.init({
            duration: 3000,
            // easing: 'ease-in-sine',
            // delay: 100,
        });
    })

    const dispatch = useDispatch()

    const servicesData = useSelector((state)=>{
        console.log("SERVICES_STATE", state.services)
        return state.services
    })

    useEffect(()=>{
        dispatch(servicesFetch())
    },[])

    if (servicesData.loading) {
        return  <div style={{height : "70vh"}}> 
                    <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div> 
    }

    if (servicesData.error !== null){
        return toast.error(servicesData.error.message) && toast.error(servicesData.error.response.data)
        // return toast.error("Something went wrong")
    }


  return (
    <>
            
    {/* <Container maxWidth="lg" sx={{ marginTop: "80px" }}> */}
    <Container maxWidth="lg" >
                <Typography variant='h4' align='center' style={{ marginTop: "50px",fontWeight:"bold"  }}>
                    Our Services
                </Typography>
                <Grid container spacing={5} style={{ marginTop: "20px" }}>
                    {
                        servicesData?.data?.data?.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ maxWidth: 345,height: "230px", backgroundColor : "#F8F9FA" }} style={{ padding: "10px", marginBottom: "30px"}} elevation={20} data-aos="zoom-in">
                                            
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" align='center' data-aos="fade-down"
>
                                                {item.name} 
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" data-aos="fade-up" dangerouslySetInnerHTML={{ __html: item?.details }} >
                                                    
                                                </Typography>
                                            </CardContent>
                                            
                                        </Card>
                                    </Grid>
                                </>
                            )
                        })
                    }


                </Grid>

            </Container>
    
    </>
  )
}
