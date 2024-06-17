import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Loader from '../Common/Loader'
import { toast } from 'react-toastify'
import { teamFetch } from '../Redux/TeamSlice'

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

export default function Teams() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        className: "center",
        centerMode: true,
        centerPadding: "30px",
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const dispatch = useDispatch()

    const teamsData = useSelector((state) => {
        console.log("TEAMS_STATE", state.teams)
        return state.teams
    })

    useEffect(() => {
        dispatch(teamFetch())
    }, [])

    if (teamsData.loading) {
        return <div style={{ height: "70vh" }}>
            <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div>
    }

    if (teamsData.error !== null) {
        return toast.error(teamsData.error.message) && toast.error(teamsData.error.response.data)
        // return toast.error("Something went wrong")
    }


    return (
        <>
            <Container maxWidth="lg" sx={{ marginTop: "60px" }}>
                {/* <Typography variant='h4' align='center' style={{ marginTop: "50px", fontWeight: "bold" }}>
                    Our Team
                </Typography> */}
                <Grid container spacing={2} style={{ marginTop: "20px" }}>

                    {/* {
                        teamsData?.data?.TeamMember?.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ maxWidth: 345, height: "auto" }} style={{ padding: "0px", marginBottom: "30px" }} elevation={20} >
                                            <CardMedia
                                                component="img"
                                                alt="PHOTO"
                                                height="auto"
                                                // image={`https://restapinodejs.onrender.com/api/team/photo/${item._id}`}
                                                image={`${process.env.REACT_APP_BASE_URL}team/photo/${item._id}`}
                                                style={{ borderRadius: "12px" }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" align='center' >

                                                    {item.possession}
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

            <Container maxWidth= "xl">
            <div className="slider-container">
                <Slider {...settings}>
                    
                    {
                        teamsData?.data?.TeamMember?.map((item, index) => {
                            return (
                                <>
                                    
                                        <Card sx={{ maxWidth: 345, height: "auto" }} style={{ padding: "0px", marginBottom: "30px" }} elevation={20} >
                                            <CardMedia
                                                component="img"
                                                alt="PHOTO"
                                                height="auto"
                                                // image={`https://restapinodejs.onrender.com/api/team/photo/${item._id}`}
                                                image={`${process.env.REACT_APP_BASE_URL}team/photo/${item._id}`}
                                                style={{ borderRadius: "12px" }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                    {item.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" align='center' >

                                                    {item.possession}
                                                </Typography>
                                            </CardContent>

                                        </Card>
                                    
                                </>
                            )
                        })
                    }
                </Slider>
                </div>
            </Container>
           

        </>
    )
}
