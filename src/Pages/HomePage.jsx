import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import Services from '../Components/Services' 
import Teams from '../Components/Teams'
import Testimonials from '../Components/Testimonials' 
import { useDispatch, useSelector } from 'react-redux'
import { bannerFetch } from '../Redux/BannerSlice'
import { Typography } from '@mui/material'
import HomeSkelton from '../Common/HomeSkeleton'


export default function HomePage() {

    const dispatch = useDispatch()

    const bannerData = useSelector((state)=>{
        console.log("BANNER_STATE", state.banner)
        return state.banner
    })

    useEffect(()=>{
        dispatch(bannerFetch())
    },[])

    if (bannerData.loading) {
      return (<HomeSkelton />)
    }


    return (
        <Layout>

<div className="container-fluid" style={{ marginTop: "70px" }}>

          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              {
                 bannerData?.data?.bannerdata?.map((item, index) => {
                  return (
                    <>
                      <div key={index} class={`carousel-item ${index === 0 ? 'active' : '' }`}>
                        {/* <img src={`https://restapinodejs.onrender.com/api/banner/photo/${item._id}`} class="d-block w-100" alt="..." height="800px" /> */}
                        <img src={`${process.env.REACT_APP_BASE_URL}banner/photo/${item._id}`} class="d-block w-100" alt="..." height="800px" />
                        <div class="carousel-caption d-none d-md-block">
                          <h3 style={index===2 ? {color: "black"} : {color: "white"} }>Title</h3>
                          <h5 style={index===2 ? {color: "black"} : {color: "white"} }>{item.title}</h5>
                        </div>
                      </div>
                    </>
                  )
                })
              }



            </div>
            <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </button>
          </div>
        </div>

            {/* ************ SERVICES ************ */}

            <Services />

            {/* ************ Teams ************ */}

            <Typography variant='h4' align='center' style={{ marginTop: "20px", fontWeight: "bold", marginBottom : "-30px" }}>
                    Our Team
                </Typography> 

            <Teams />

            {/* ************ Testimonials ************ */}

            <Typography variant='h4' align='center' style={{ marginTop: "50px", fontWeight: "bold", marginBottom : "-30px" }}>
                    Testimonials
                </Typography> 

            <Testimonials />

        </Layout>
    )
}
