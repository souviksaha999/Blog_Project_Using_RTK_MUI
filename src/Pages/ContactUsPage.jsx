import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import SubmitLoader from '../Common/SubmitLoader'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { contactUs } from '../Redux/ContactSlice'
import { useDispatch, useSelector } from 'react-redux'
import ImageHeader from '../Images/ImageHeader'
import MyComponent from "../Components/GoogleMap"

import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';


export default function ContactUsPage() {
    const data = { name: "", email: "", phone: "", message: "", }

    const [user, setuser] = useState(data)
    const dispatch = useDispatch()

    const contactUsData = useSelector((state) => {
        console.log("CONTACT_US_STATE...", state.contactUs)
        return state.contactUs
    })

    const onChange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }


    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(contactUs(user))
        setuser({ ...user, name: "", email: "", phone: "", message: "" })
    }




    return (
        <>
            <Layout>
                <ImageHeader />

                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div>
                        <MyComponent />

                    </div>


                    {/* <div class="row justify-content-center" data-aos="fade-up"> */}
                    <div class="row justify-content-center" >

                        <div >
                            <Grid >
                                <Paper elevation={20} style={{ padding: '30px 20px', width: "50vw", margin: "60px auto" }}>
                                <div class="info-wrap">
                                <div class="row">
                                
                                    <div class="col-lg-4 info">
                                        {/* <i class="icofont-google-map"></i> */}
                                       <span style={{color : "#1bbd36"}}><LocationOnIcon fontSize='large'/></span> 
                                        <span style={{fontSize: "23px", fontWeight : "bold"}}>Location:</span>
                                        <p>A108 Adam Street<br />KOLKATA, 700002</p>
                                    </div>

                                    <div class="col-lg-4 info mt-4 mt-lg-0">
                                        {/* <i class="icofont-envelope"></i> */}
                                        <span style={{color : "#1bbd36"}}><EmailIcon fontSize='large'/></span> 
                                        <span style={{fontSize: "23px", fontWeight : "bold"}}>Email:</span>
                                        <p>info@example.com<br />contact@example.com</p>
                                    </div>

                                    <div class="col-lg-4 info mt-4 mt-lg-0">
                                        {/* <i class="icofont-phone"></i> */}
                                        <span style={{color : "#1bbd36"}}><CallIcon fontSize='large'/></span> 
                                        <span style={{fontSize: "23px", fontWeight : "bold"}}>Call:</span>
                                        <p>+1 5589 55488 51<br />+1 5589 22475 14</p>
                                    </div>
                                </div>
                            </div>
                                </Paper>
                            

                            </Grid>

                           

                        </div>

                    </div>

                    <div>
                        <Grid sx={{ marginTop: "0px" }}>
                            <Paper elevation={20} style={{ padding: '30px 20px', width: "50vw", margin: "0px auto" }}>
                                <Grid align='center'>
                                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>

                                        <AddCircleOutlineIcon />
                                    </Avatar>
                                    <h2 style={{ margin: 10 }}>Contact Us</h2>
                                    <Typography variant='caption' gutterBottom>Feel free to contact us!</Typography>
                                </Grid>
                                <form action='' method='POST' onSubmit={handleSubmit}>

                                    <TextField fullWidth label='Name' placeholder="Enter your name" margin="normal" color="secondary" type='text' name='name' value={user.name} onChange={onChange} />
                                    <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />

                                    <TextField fullWidth label='Phone' placeholder="Enter your Phone No" margin="normal" color="secondary" type='number' name='phone' value={user.phone} onChange={onChange} />
                                    <TextField fullWidth label='Message' placeholder="Send Your Message" margin="normal" color="secondary" type='text' rows={1000} name='message' value={user.message} onChange={onChange} />


                                    <Box variant='div' sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}>
                                        <Button type='submit' variant='contained' style={{ backgroundColor: "#1bbd7e" }} > {contactUsData.loading ? <SubmitLoader /> : 'Submit'} </Button>
                                    </Box>
                                </form>
                            </Paper>
                        </Grid>
                    </div>
                </div>



            </Layout>

        </>
    )
}
