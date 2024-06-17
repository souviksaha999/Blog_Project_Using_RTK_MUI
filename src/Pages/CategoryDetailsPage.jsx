import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { catgDetailsFetch } from '../Redux/CategoryDetailsSlice' 
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import ThumbUpAltSharpIcon from '@mui/icons-material/ThumbUpAltSharp';
import ThumbDownSharpIcon from '@mui/icons-material/ThumbDownSharp';
import SmsSharpIcon from '@mui/icons-material/SmsSharp';
import Categories from '../Components/Categories'
import LatestPost from '../Components/LatestPost'
import Layout from '../Common/Layout'
import Loader from '../Common/Loader'


import Aos from 'aos'
import 'aos/dist/aos.css'
import ImageHeader from '../Images/ImageHeader'
    

export default function CategoryDetailsPage() {

    useEffect(()=>{
        Aos.init({
            duration: 3000,
            // easing: 'ease-in-sine',
            // delay: 100,
        });
    })

    const { id } = useParams()
    const dispatch = useDispatch()

    const catgDetailsData = useSelector((state) => {
        console.log("CATG_DETAILS_STATE", state.categoryPost)
        return state.categoryPost
    })

    useEffect(() => {
        dispatch(catgDetailsFetch(id))
    }, [id])


    if (catgDetailsData.loading) {
        return  <div style={{height : "70vh"}}> 
        <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div> 
    }

    return (
        <Layout>
                    {/* <ImageHeader /> */}

            <Container sx={{ marginTop: "80px" }}>
                <Typography variant='h4' align='center' style={{ marginTop: "10px", fontWeight: "bold" }}>
                    Category Post
                </Typography>
                <Grid container spacing={2} style={{ marginTop: "20px" }} >
                    <Grid item md={8} data-aos="fade-down-right">
                        {
                            catgDetailsData?.data?.data?.map((item, index) => {
                                return (
                                    <>
                                        <Card sx={{ maxWidth: 790, height: "auto" }} style={{ marginBottom: "10px" }} elevation={20} >
                                            <CardMedia
                                                component="img"
                                                alt="green iguana"
                                                height="auto"
                                                image={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`}
                                            />
                                            {/* <img src={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`} alt="" height="60px" width="100px"/> */}

                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" align='center' sx={{ fontWeight: "bold" }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: "16px" }} color="text.secondary" dangerouslySetInnerHTML={{ __html: item?.postText?.slice(0, 500) }} >

                                                </Typography>
                                                <span style={{ padding: "5px" }}><ThumbUpAltSharpIcon /> {item.likes} </span>

                                                <span style={{ padding: "5px" }}><ThumbDownSharpIcon /> {item.unlikes} </span>

                                                <span style={{ padding: "5px" }}><SmsSharpIcon /> {item.comments?.length} </span>
                                            </CardContent>

                                        </Card>



                                    </>
                                )
                            })
                        }
                    </Grid>
                    {/* ********* Category ************ */}

                    <Grid item md={4} data-aos="fade-down-left">

                        <Card sx={{ maxWidth: 500, height: "auto" }} style={{ padding: "10px", marginBottom: "30px" }} elevation={20} >
                           

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
