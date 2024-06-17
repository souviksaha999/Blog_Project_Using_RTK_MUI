import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, TextField, Typography } from '@mui/material'
import Loader from '../Common/Loader'
import { toast } from 'react-toastify'
import { blogDetailsFetch } from '../Redux/BlogDetailsSlice'
import { showCommentsFetch } from '../Redux/ShowCommentsSlice'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Common/Layout'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import SmsSharpIcon from '@mui/icons-material/SmsSharp';
import Categories from '../Components/Categories'
import LatestPost from '../Components/LatestPost'
import ReplyIcon from '@mui/icons-material/Reply';
import { Like } from '../Redux/LikeUnlikeSlice'
import { UnLike } from '../Redux/LikeUnlikeSlice'
import { createComment } from '../Redux/CreateCommentSlice'
import SubmitLoader from "../Common/SubmitLoader"

import Aos from 'aos'
import 'aos/dist/aos.css'
import ImageHeader from '../Images/ImageHeader'

export default function BlogDetailsPage() {

  useEffect(()=>{
    Aos.init({
        duration: 3000,
        // easing: 'ease-in-sine',
        // delay: 100,
    });
})


  const { id } = useParams() 
  
  const data = { name: "", email: "", comment: "" }

  const [user, setUser] = useState(data)

  const dispatch = useDispatch()

  const blogDetailsData = useSelector((state) => {
    // console.log("BLOG_DETAILS_STATE", state.blogDetails)
    return state.blogDetails
  })

  const showCommentsData = useSelector((state) => {
    console.log("SHOW_COMMENTS_STATE", state.showComments)
    return state.showComments
  })

  const likeUnlikeData = useSelector((state) => {
    // console.log("LIKE_UNLIKE_STATE", state.likeUnlike)
    return state.likeUnlike
  })

  const createCommentData = useSelector((state) => {
    console.log("CREATE_COMMENT_STATE", state.createComment)
    return state.createComment
  })

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    console.log(user)
}

const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createComment({id,user}))
    await dispatch(blogDetailsFetch(id))
    await dispatch(showCommentsFetch(id))
    // document.create_comment_form.reset()
    // document.getElementById("form_id").reset()
    setUser({...user, name: "", email: "", comment: ""  })
}

  const LIKE = async()=>{
    await dispatch(Like(id))
    await dispatch(blogDetailsFetch(id))

  } 

  const UNLIKE = async()=>{
    await dispatch(UnLike(id))
    await dispatch(blogDetailsFetch(id))
  } 

  
  useEffect(() => {
    dispatch(blogDetailsFetch(id))
    dispatch(showCommentsFetch(id))
    // dispatch(Like(id))

  }, [dispatch,id])

  const [initalload, setinitialLoad] = useState(4)

  const loadMore = () => {
    setinitialLoad(initalload + 2)
  }

  if (blogDetailsData.loading) {
    return <div style={{ height: "70vh" }}>
      <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}> <Loader /> </h1></div>
  }

  if (blogDetailsData.error !== null) {
    return toast.error(blogDetailsData.error.message) && toast.error(blogDetailsData.error.response.data)
    // return toast.error("Something went wrong")
  }


  return (
    <Layout>
        {/* <ImageHeader /> */}

      <Container maxWidth='xl'>
        <Container sx={{ marginTop: "80px" }}>
          <Typography variant='h4' align='center' style={{ marginTop: "10px", fontWeight: "bold" }}>
            Detailed Blog
          </Typography>
          <Grid container spacing={2} style={{ marginTop: "20px" }} >
            <Grid item md={8} data-aos="fade-down-right">
              {
                <Card sx={{ maxWidth: 790, height: "auto" }} style={{ padding: "10px", marginBottom: "10px" }} elevation={20} >
                  <CardMedia
                    component="img"
                    alt="Photo"
                    height="auto"
                    // image={`https://restapinodejs.onrender.com/api/blog/image/${blogDetailsData?.data?.data?._id}`}
                    image={`${process.env.REACT_APP_BASE_URL}blog/image/${blogDetailsData?.data?.data?._id}`}
                    style={{ borderRadius: "12px" }}
                  />
 
                  <CardContent>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button fontSize="large" color='success' onClick={LIKE} > <ThumbUpOutlinedIcon />  <span style={{ paddingLeft: "5px" }}>{blogDetailsData?.data?.data?.likes}</span></Button>
                      <Button fontSize="large" color='warning' onClick={UNLIKE} > <ThumbDownOffAltOutlinedIcon />  <span style={{ paddingLeft: "5px" }}>{blogDetailsData?.data?.data?.unlikes}</span></Button>
                      {/* <Button fontSize="large" color='warning'  > <ThumbDownOffAltOutlinedIcon />  <span style={{ paddingLeft: "5px" }}>{blogDetailsData?.data?.data?.unlikes}</span></Button> */}


                      <span style={{ padding: "5px" }}><SmsSharpIcon /> {blogDetailsData?.data?.data?.comments?.length} </span>
                    </div>



                    <Typography gutterBottom variant="h5" component="div" align='center' sx={{ fontWeight: "bold" }}>
                      {blogDetailsData?.data?.data?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" dangerouslySetInnerHTML={{ __html: blogDetailsData?.data?.data?.postText }} >
                    </Typography>




                  </CardContent>
                  <CardActions>
                    <Link to={`/allblogs`} class="btn btn-primary" style={{ marginLeft: "auto", marginTop: "-10px" }}>Back</Link>
                  </CardActions>
                </Card>

              }
            </Grid>

            {/* *********** Category ************* */}

            <Grid item md={4} data-aos="fade-down-left" >

              <Card sx={{ maxWidth: 500, height: "auto" }} style={{ padding: "10px", marginBottom: "30px" }} elevation={20} >


                <Categories />

                {/* ********* Latest Post ************ */}

                <LatestPost />
              </Card>

            </Grid>
          </Grid>
        </Container>

        {/* ******* Show Comments ********* */}

        <Container sx={{ marginTop: "20px" }}>
          <Typography variant='h4' style={{ marginTop: "10px", fontWeight: "bold", paddingBottom: "15px" }}>
            {showCommentsData?.data?.post?.comment?.comments.length} Comments :
          </Typography>
          <Grid container >
            <Grid item md={8.5} >
              {
                showCommentsData?.data?.post?.comment?.comments?.slice(0, initalload)?.map((item, index) => {
                  return (
                    <>
                      <Typography variant="h5" component="div" sx={{ fontWeight: "bold", paddingLeft: "30px" }}>
                        {item?.name} <ReplyIcon />
                      </Typography>
                      <Typography gutterBottom variant="body1" color="text.secondary" sx={{ fontWeight: "bold", paddingLeft: "55px", paddingBottom: "10px" }} >
                        {item?.comment}
                      </Typography>

                    </>
                  )
                })
              }

              <Box variant='div' sx={{ display: "flex", justifyContent: "flex-start", margin: "10px 0px" }}>
                <button className='btn btn-success ' onClick={loadMore}>Load More</button>

              </Box>

            </Grid>
          </Grid>

        </Container>

        {/* ******* Creating Comment ********* */}

        <Container maxWidth="lg" sx={{ marginTop: "20px" }}>
                                <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
                                    <Paper elevation={20} style={{ padding: '30px 20px', width: 700, }}>
                                        <Grid align='left'>

                                            <h2 style={{ margin: 10 }}>Leave your Comment </h2>
                                            <Typography variant='caption' gutterBottom>Your reply is valuable for us !</Typography>
                                        </Grid>
                                        <form id=" form_id " name='create_comment_form' action='' method='POST' onSubmit={handleSubmit}>

                                            <TextField fullWidth label='Name' placeholder="Enter your name" margin="normal" color="secondary" type='text' name='name' value={user.name} onChange={onChange} />
                                            <TextField fullWidth label='Email' placeholder="Enter your email" margin="normal" color="secondary" type='email' name='email' value={user.email} onChange={onChange} />

                                            <TextField fullWidth label='Comment' placeholder="Write your comment" margin="normal" color="secondary" type='text' name='comment' value={user.comment} onChange={onChange} />


                                            <Box variant='div' sx={{ display: "flex", justifyContent: "center", margin: "10px 0px" }}>
                                                {/* <Button type='submit' variant='contained' color='secondary'  >{load ? <SubmitLoader /> : 'Post Comment'}</Button> */}
                                                <Button type='submit' variant='contained' color='secondary'  >{createCommentData?.loading ? <SubmitLoader /> : 'Post Comment'}</Button>
                                            </Box>
                                        </form>
                                    </Paper>
                                </Grid>
                            </Container>

      </Container>


    </Layout>
  )
}
