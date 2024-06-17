import React, { useEffect } from 'react'
import Layout from '../Common/Layout'
import Services from '../Components/Services'
import ImageHeader from '../Images/ImageHeader'
import { useDispatch, useSelector } from 'react-redux'
import { servicesFetch } from '../Redux/ServicesSlice'
import Loader from '../Common/Loader'

export default function ServicesPage() {

  const dispatch = useDispatch()
  

  return (
    <Layout>
              <ImageHeader />

        <Services />
    
    </Layout>
  )
}
