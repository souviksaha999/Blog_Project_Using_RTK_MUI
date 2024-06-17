import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { coursesFetch } from '../Redux/CoursesSlice'
import { Card, CardContent, Container, Grid, Typography } from '@mui/material'
import Loader from '../Common/Loader'
import { toast } from 'react-toastify'

import Aos from 'aos'
import 'aos/dist/aos.css'
import ImageHeader from '../Images/ImageHeader'
import CoursesSkelton from '../Common/CoursesSkeleton'


export default function CoursesPage() {
    useEffect(()=>{
        Aos.init({
            duration: 3000,
            // easing: 'ease-in-sine',
            // delay: 100,
        });
    })

    const dispatch = useDispatch()

    const coursesData = useSelector((state)=>{
        console.log("COURSES_STATE", state.courses )
        return state.courses
    })

    useEffect(()=>{
        dispatch(coursesFetch())
    },[])

    // if (coursesData.loading) {
    //     return  <div style={{height : "70vh"}}> 
    //                 <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div> 
    // }
    if (coursesData.loading) {
        return  <CoursesSkelton />
    }

    if (coursesData.error !== null){
        return toast.error(coursesData.error.message) && toast.error(coursesData.error.response.data)
        // return toast.error("Something went wrong")
    }


  return (
    <Layout>
                <ImageHeader />

                <Typography variant='h3' align='center' style={{ marginTop: "-210px", fontWeight: "bold", color : "white" }}>
                Courses
                            </Typography>

        <Container maxWidth="lg" sx={{ marginTop: "80px" }}>
                {/* <Typography variant='h4' align='center' style={{ marginTop: "50px" }}>
                    Courses
                </Typography> */}
                <Grid container spacing={5} style={{ marginTop: "20px" }}>
                    {
                        coursesData?.data?.Courses?.map((item, index) => {
                            return (
                                <>
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ maxWidth: 400,height: "400px" }} style={{ padding: "10px", marginBottom: "30px"}} elevation={20} data-aos="zoom-in">
                                            
                                            {/* <img src={`https://restapinodejs.onrender.com/api/course/photo/${item._id}`} alt="" height="200px" style={{display : "block", margin : "0 auto"}}/> */}
                                            <img src={`${process.env.REACT_APP_BASE_URL}course/photo/${item._id}`} alt="" height="200px" style={{display : "block", margin : "0 auto"}} data-aos="fade-down-right"/>
                                            <CardContent data-aos="fade-up-left" data-aos-duration="1500">
                                                <Typography gutterBottom variant="h5" component="div" align='center'>
                                                {item.name} 
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary"  >
                                                Requirement : {item.requirement}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary"  >
                                                Duration : {item.duration}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary"  >
                                                Fees : {item.fees}
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

    </Layout>
  )
}
