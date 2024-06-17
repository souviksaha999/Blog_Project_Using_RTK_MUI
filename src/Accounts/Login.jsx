import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Layout from '../Common/Layout'
import SubmitLoader from '../Common/SubmitLoader'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../Redux/LoginSlice';
import { loginUser } from '../Redux/AuthSlice'; 
import Loader from '../Common/Loader';
import { regLogOut } from '../Redux/AuthSlice';
import Swal from 'sweetalert2'

export default function Login() {

  const data = {email:"",password:""}

  const {redirectToor, loading} = useSelector((state)=>{
    console.log("LOGIN_STATE", state?.auth)
    return state?.auth
})

    const [user,setuser] = useState(data)
    const [load,setLoad] = useState(false)

    const dispatch = useDispatch()

    // const loginData = useSelector((state) => {
    //     console.log("LOGIN_STATE", state.login)
    //     return state.login
    // })

    const onChange = (e)=>{ 
      setuser({...user, [e.target.name] : e.target.value})
      console.log(user)
    }
    
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
      e.preventDefault()
      // setLoad(true)
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        // text: "You won't be able to revert this!",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Log In!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Logged In!",
            text: "You have logged in",
            icon: "success"
          });
          
           dispatch(loginUser(user))
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your credential is safe :)",
            icon: "error"
          });
        }
      });
   

    }

    useEffect(() => {
      const redirectUser = () => {
        let name = localStorage.getItem("token")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/login";  // window.location.pathname property is used to return pathname of current URL
        if (name !== null && name !== undefined && name !== "") {
          isInLoginPage && navigate("/");
        }
      }
  
      redirectUser();
    }, [redirectToor])
  
    const reg = () => {
      dispatch(regLogOut())
    }

    // if (loading) {
    //     return <div style={{ height: "70vh" }}>
    //         <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div>
    // }

    // if (loginData.error !== null) {
    //     return toast.error(loginData.error.message) && toast.error(loginData.error.response.data) && toast.error(loginData.error.response.data.msg)
        // return toast.error("Something went wrong")
    // }

    
    
  return (
    <>
    <Layout>
       
        <Grid sx={{marginTop: "100px"}}>
            <Paper elevation={20} style={{ padding: '30px 20px', width: 500, margin: "20px auto" }}> 
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                       
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <h2 style={{ margin: 10 }}>Log In</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to Log into your Account !</Typography>
                </Grid>
                
                <form action='' method='POST' onSubmit={handleSubmit}>

                    <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />
                    
                    <TextField fullWidth label='Password' placeholder="Enter your password" margin="normal" color="secondary" type='password' name='password' value={user.password} onChange={onChange}/>


                    <Box variant='div' sx={{display : "flex" , justifyContent:"center", margin: "10px 0px"}}>
                    <Button type='submit' variant='contained' style={{backgroundColor : "#1bbd36"}} >{loading? <SubmitLoader/> : 'Log In' }</Button>
                    </Box>

                    {/* <Link to='/reg' style={{display : "flex" , justifyContent:"center"}}>Don't have an Account?  Register</Link> */}
                    <Link to='/reg' onClick={reg} style={{display : "flex" , justifyContent:"center", textDecoration : "none", color : "#1bbd36"}}>Don't have an Account?  Register</Link>
                </form>

            </Paper>
        </Grid> 
       
        
    </Layout>
    </>
  )
}
