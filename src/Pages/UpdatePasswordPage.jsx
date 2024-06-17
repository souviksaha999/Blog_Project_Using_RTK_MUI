import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Layout from '../Common/Layout'
import SubmitLoader from '../Common/SubmitLoader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
// import { useAuth } from '../Context/Auth';

import { updatePassword } from '../Redux/UpdatePasswordSlice';
import ImageHeader from '../Images/ImageHeader';


export default function UpdatePasswordPage() {

  const data = {user_id:"",password:""}

    const [user,setuser] = useState(data)

    const dispatch = useDispatch()

    const updatePasswordData = useSelector ((state)=>{
        console.log("UPDATE_PASSWRD_STATE", state.updatePassword )
        return state.updatePassword
    })


    const onChange = (e)=>{
      setuser({...user, [e.target.name] : e.target.value})
      console.log(user)
    }
    

    const navigate = useNavigate()
    const handleSubmit = async(e)=>{
      e.preventDefault()

    await dispatch(updatePassword(user))
    setuser({...user, user_id:"",password:"" })

    }




  return (
    <>
    <Layout>
    <ImageHeader />

       
        <Grid sx={{marginTop : "0px"}}>
            <Paper elevation={20} style={{ padding: '30px 20px', width: 600, margin: "20px auto" }}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                       
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <h2 style={{ margin: 10 }}>Update Password</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to Log into your Account !</Typography>
                </Grid>
                <form action='' method='POST' onSubmit={handleSubmit}>

                    <TextField fullWidth label='User_Id' placeholder="Enter your Id" margin="normal" color="secondary" type='text' name='user_id' value={user.user_id} onChange={onChange} />
                    
                    <TextField fullWidth label='Password' placeholder="Enter your password" margin="normal" color="secondary" type='password' name='password' value={user.password} onChange={onChange}/>


                    <Box variant='div' sx={{display : "flex" , justifyContent:"center", margin: "10px 0px"}}>
                    <Button type='submit' variant='contained' color='secondary'  >{updatePasswordData.loading ? <SubmitLoader/> : 'Update' }</Button>
                    </Box>
                    <Link to='/reg' style={{display : "flex" , justifyContent:"center"}}>Don't have an Account?  Register</Link>
                </form>
            </Paper>
        </Grid> 
       
        
    </Layout>
    </>
  )
}
