import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Loader from '../Common/Loader'
import SubmitLoader from '../Common/SubmitLoader'
import { toast } from 'react-toastify'
import { latestPostFetch } from '../Redux/LatestPostSlice'


import Aos from 'aos'
import 'aos/dist/aos.css'


export default function LatestPost() {

    useEffect(()=>{
        Aos.init({
            duration: 3000,
            // easing: 'ease-in-sine',
            // delay: 100,
        });
    })

    const dispatch = useDispatch()

    const latestPostData = useSelector((state) => {
        // console.log("LATEST_POST_STATE", state.latestPost)
        return state.latestPost
    })

    useEffect(() => {
        dispatch(latestPostFetch())
    }, [])

    if (latestPostData.loading) {
        return <div style={{ height: "70vh" }}>
            <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <SubmitLoader /> </h1></div>
    }

    if (latestPostData.error !== null) {
        return toast.error(latestPostData.error.message) && toast.error(latestPostData.error.response.data)
        // return toast.error("Something went wrong")
    }


    return (
        <>

<Typography variant='h5' style={{ marginTop: "10px", marginBottom: "20px", fontWeight: "bold" }}>
                                            Latest Posts :-
                                        </Typography>

                                        

                                        {
                                            latestPostData?.data?.data?.map((item, index) => {
                                                return (
                                                    <>

                                                        <span>
                                                            <CardContent data-aos="fade-left" >
                                                                <Box sx={{ display: "inline" }}>
                                                                    <span style={{ fontSize: "18px", fontWeight: "bold", paddingRight: "5px" }} >{index + 1}.</span>
                                                                    {/* <img src={`https://restapinodejs.onrender.com/api/blog/image/${item._id}`} alt="" height="60px" width="100px" /> */}
                                                                    <img src={`${process.env.REACT_APP_BASE_URL}blog/image/${item._id}`} alt="" height="40px" width="80px" />
                                                                </Box>
                                                                <Box sx={{ display: "inline", paddingLeft: "10px" }}>

                                                                    <span style={{ fontSize: "14px", fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: item.title }}>
                                                                    </span>
                                                                </Box>

                                                            </CardContent>
                                                        </span>


                                                    </>
                                                )
                                            })
                                        }
            

        </>
    )
}
