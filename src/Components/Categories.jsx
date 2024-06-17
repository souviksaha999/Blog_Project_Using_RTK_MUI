import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import Loader from '../Common/Loader'
import { toast } from 'react-toastify'
import { categoriesFetch } from '../Redux/CategoriesSlice'
import { Link } from 'react-router-dom'

import Aos from 'aos'
import 'aos/dist/aos.css'



export default function Categories() {

    useEffect(()=>{
        Aos.init({
            duration: 3000,
            easing: 'ease-in-sine',
            // delay: 100,
        });
    })

    const dispatch = useDispatch()

    const categoriesData = useSelector((state) => {
        // console.log("CATEGORIES_STATE", state.categories)
        return state.categories
    })

    useEffect(() => {
        dispatch(categoriesFetch())
    }, [])

    if (categoriesData.loading) {
        return <div style={{ height: "70vh" }}>
            <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div>
    }

    if (categoriesData.error !== null) {
        return toast.error(categoriesData.error.message) && toast.error(categoriesData.error.response.data)
        // return toast.error("Something went wrong")
    }


    return (
        <>
            <Typography variant='h5' style={{ marginTop: "10px", marginBottom: "20px", fontWeight: "bold" }}>
                Categories :-
            </Typography>
            {
                categoriesData?.data?.data?.map((item, index) => {
                    return (
                        <>
                            <CardContent data-aos="fade-left">
                                <Typography sx={{ marginTop: "-18px" }}  >
                                    <Link style={{ color: "black", fontSize: "16px", fontWeight: "bold", textDecoration: "none" }} to={`/catgerorypost/${item._id}`}> {item.category} </Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary"  >

                                </Typography>

                            </CardContent>
                        </>
                    )
                })
            }

        </>
    )
}
