import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SubmitLoader from '../Common/SubmitLoader';
// import { registerUser } from '../Redux/RegSlice';
import { registerUser } from '../Redux/AuthSlice'; 
import Loader from '../Common/Loader';


export default function Reg() {

    const data = { name: "", email: "", mobile: "", password: "" } 

    const {redirectTo, loading} = useSelector((state)=>{
        console.log("REGISTER_STATE", state.auth)
        return state.auth
    })

    const [user, setUser] = useState(data)
    const [photo, setPhoto] = useState()
    // const [load, setLoad] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const registerData = useSelector((state) => {
    //     console.log("REGISTER_STATE", state.register)
    //     return state.register
    // })

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        console.log(user)
    }

    const changeImage = (e) => {
        setPhoto(e.target.files[0])
        console.log(e.target.files)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setLoad(true)
        const formData = new FormData()
        formData.append("name", user.name)
        formData.append("email", user.email)
        formData.append("mobile", user.mobile)
        formData.append("password", user.password)
        formData.append("photo", photo)
         
        dispatch(registerUser(formData))
    }

    useEffect(() => {
        const redirectUser = () => {
          let name = localStorage.getItem("name")
          let isInLoginPage = window.location.pathname.toLowerCase() === "/reg";
          if (name !== null && name !== undefined && name !== "") {
            isInLoginPage && navigate("/login");
          }
        }
        redirectUser();
      }, [redirectTo]);



    // if (loading) {
    //     return <div style={{ height: "70vh" }}>
    //         <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div>
    // }




    return (
        <Layout>

            <Grid sx={{ marginTop: "100px" }}>
                <Paper elevation={20} style={{ padding: '30px 20px', width: 500, margin: "20px auto" }}>
                    <Grid align='center'>
                        <Avatar style={{ backgroundColor: '#1bbd7e' }}>

                            <AddCircleOutlineIcon /> 
                        </Avatar>
                        <h2 style={{ margin: 10 }}>Sign Up</h2>
                        <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                    </Grid>
                    <form action='' method='POST' onSubmit={handleSubmit} >
                        <TextField fullWidth label='Name' placeholder="Enter your name" margin="normal" color="secondary" type='text' name='name' value={user.name} onChange={onChange} />

                        <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />

                        <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" margin="normal" color="secondary" type='number' name='mobile' value={user.mobile} onChange={onChange} />

                        <TextField fullWidth label='Password' placeholder="Enter your password" margin="normal" color="secondary" type='password' name='password' value={user.password} onChange={onChange} />

                        <TextField fullWidth margin="normal" color="secondary" type='file' name='photo' accept='image/*' onChange={changeImage} />
                        {
                            photo !== "" && photo !== null && photo !== undefined ? (
                                <>
                                    <img src={URL.createObjectURL(photo)} alt="PHOTO" height="180px" />
                                </>
                            ) : (<>{photo === "" && <p> Drag and Drop Image </p>}</>)
                        }

                        <Box variant='div' sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}>
                            <Button type='submit' variant='contained' style={{backgroundColor : "#1bbd36"}}  >{loading ? <SubmitLoader /> : 'Register'}</Button>
                            
                        </Box>

                    </form>
                    <Link to='/login' style={{ display: "flex", justifyContent: "center", textDecoration : "none", color : "#1bbd36" }}>Already have an Account?  Login</Link>
                </Paper>
            </Grid>

        </Layout>
    )
}
