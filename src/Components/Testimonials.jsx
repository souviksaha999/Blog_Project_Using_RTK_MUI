import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Loader from '../Common/Loader'
import { toast } from 'react-toastify'
import { testimonialFetch } from '../Redux/TestimonialsSlice'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }



export default function Testimonials() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        className: "center",
        centerMode: true,
        centerPadding: "30px",
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,

        vertical: true,
        verticalSwiping: true,
        beforeChange: function(currentSlide, nextSlide) {
          console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function(currentSlide) {
          console.log("after change", currentSlide);
        }
      };

    const dispatch = useDispatch()

    const testimonialsData = useSelector((state)=>{
        console.log("TESTIMONIALS_STATE", state.testimonials)
        return state.testimonials
    })

    useEffect(()=>{
        dispatch(testimonialFetch())
    },[])

    if (testimonialsData.loading) {
        return  <div style={{height : "70vh"}}> 
                    <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div> 
    }

    if (testimonialsData.error !== null){
        return toast.error(testimonialsData.error.message) && toast.error(testimonialsData.error.response.data)
        // return toast.error("Something went wrong")
    }


  return (
    <>
    <Container maxWidth="lg" sx={{ marginTop: "80px" }}>
                {/* <Typography variant='h4' align='center' style={{ marginTop: "50px",fontWeight:"bold" }}>
                    Testimonials
                </Typography> */}
                <Grid container spacing={2} style={{ marginTop: "20px" }}>
                    {/* {
                        testimonialsData?.data?.testimonials?.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={6} key={index}>
                                        <Card sx={{ maxWidth: 560 ,height: "280px" }} style={{ padding: "30px", marginBottom: "30px"}} elevation={20} >
                                            
                                            <Avatar 
                                                // src={`https://restapinodejs.onrender.com/api/testimonials/photo/${item._id}`}
                                                src={`${process.env.REACT_APP_BASE_URL}testimonials/photo/${item._id}`}
                                                alt='PHOTO'
                                                sx={{width : 90, height : 90, textAlign: "center" }}
                                                
                                            />
                                            <CardContent sx={{marginTop: "-70px"}}>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                {item.name} 
                                                </Typography>
                                                <Typography gutterBottom variant="body1" color="text.secondary" align='center' >
                                                   
                                                     {item.position}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" align='center' >
                                
                                                     {item.talk}
                                                </Typography>
                                            </CardContent>
                                           
                                        </Card>
                                    </Grid>
                                </>
                            )
                        })
                    } */}


                </Grid>

            </Container>

            <Container maxWidth= "lg" sx={{marginBottom : "20px"}}>
                <Slider {...settings}>
                    
                {
                        testimonialsData?.data?.testimonials?.map((item, index) => {
                            return (
                                <>
                                        <Card sx={{ maxWidth: 1060 ,height: "280px" }} style={{ padding: "30px", marginBottom: "30px"}} elevation={20} >
                                            
                                            <Avatar 
                                                // src={`https://restapinodejs.onrender.com/api/testimonials/photo/${item._id}`}
                                                src={`${process.env.REACT_APP_BASE_URL}testimonials/photo/${item._id}`}
                                                alt='PHOTO'
                                                sx={{width : 90, height : 90, textAlign: "center" }}
                                                
                                            />
                                            <CardContent sx={{marginTop: "-70px"}}>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                {item.name} 
                                                </Typography>
                                                <Typography gutterBottom variant="body1" color="text.secondary" align='center' >
                                                   
                                                     {item.position}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" align='center' >
                                
                                                     {item.talk}
                                                </Typography>
                                            </CardContent>
                                           
                                        </Card>
                                </>
                            )
                        })
                    }
                </Slider>
            </Container>
    
    </>
  )
}

