import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../Redux/AllBlogSlice'
import { Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import SmsSharpIcon from '@mui/icons-material/SmsSharp';
import Loader from '../Common/Loader'
import {  toast } from 'react-toastify';
import Layout from '../Common/Layout'
import Categories from '../Components/Categories'
import LatestPost from '../Components/LatestPost'


import Aos from 'aos'
import 'aos/dist/aos.css'
import ImageHeader from '../Images/ImageHeader'
import BlogSkelton from '../Common/BlogSkeleton'


export default function AllBlogs() {

    useEffect(()=>{
        Aos.init({
            duration: 3000,
            // easing: 'ease-in-sine',
            // delay: 100,
        });
    })

    const dispatch = useDispatch()

    const blogData = useSelector((state)=>{
        console.log("ALL_BLOGS_STATE", state.blogs)
        return state.blogs
    })

    useEffect(()=>{
        dispatch(fetchBlogs())
    },[])

    // if (blogData.loading) {
    //     return  <div style={{height : "70vh"}}> 
    //                 <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div> 
    // }
    if (blogData.loading) {
        return  (<BlogSkelton />)
    }

    if (blogData.error !== null){
        return toast.error(blogData.error.message) && toast.error(blogData.error.response.data)
        // return toast.error("Something went wrong")
    }

  return (
    <Layout>
        
        <ImageHeader />
        <Typography variant='h3' align='center' style={{ marginTop: "-210px", fontWeight: "bold", color : "white" }}>
                                Blogs
                            </Typography>

    <Container sx={{ marginTop: "80px" }}>
                            {/* <Typography variant='h4' align='center' style={{ marginTop: "10px", fontWeight: "bold" }}>
                                Blogs
                            </Typography> */}
                            <Grid container spacing={2} style={{ marginTop: "20px" }} >
                                <Grid item md={8} data-aos="fade-down-right">
                                    {
                                        blogData?.data?.map((item, index) => {
                                            return (
                                                <>

                                                    <Card key={index} sx={{ maxWidth: 790, height: "auto" }} style={{ padding: "0px", marginBottom: "10px", borderRadius: "12px" }} elevation={20} data-aos="zoom-in-up">
                                                        <CardMedia
                                                            component="img"
                                                            alt="green iguana"
                                                            height="470"
                                                            // image={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`}
                                                            image={`${process.env.REACT_APP_BASE_URL}/blog/image/${item._id}`}
                                                            style={{ borderRadius: "12px" }}

                                                        />
                                                        <CardContent sx={{ padding: "10px" }}>
                                                            <Typography gutterBottom variant="h5" component="div" align='center' sx={{ fontWeight: "bold" }}>
                                                                {item.title}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ fontSize: "16px" }} color="text.secondary" dangerouslySetInnerHTML={{ __html: item?.postText?.slice(0, 500) }} >

                                                            </Typography>
                                                            <span style={{ padding: "5px" }}><SmsSharpIcon /> {item.comment_count} </span>
                                                        </CardContent>
                                                        <CardActions>
                                                            {/* <Button size="small">Share</Button> */}
                                                            <Link to={`/blogdetails/${item._id}`} class="btn btn-success" style={{ marginLeft: "auto", marginTop: "-10px" }}>Read More</Link>
                                                        </CardActions>
                                                    </Card>



                                                </>
                                            )
                                        })
                                    }
                                </Grid>
                                {/* ********* Category ************ */}

                                <Grid item md={4}  data-aos="fade-down-left" >

                                    <Card sx={{ maxWidth: 500, height: "auto", position : "sticky", top: "80px" }} style={{ padding: "10px", marginBottom: "30px" }} elevation={20} >
                                        

                                        <Categories />

                                        {/* ********* Latest Post ************ */}
                                        

                                        <LatestPost />
                                    </Card>

                                </Grid>
                                
                            </Grid>

                            
                        </Container>

                        
    </Layout>
  )
}
