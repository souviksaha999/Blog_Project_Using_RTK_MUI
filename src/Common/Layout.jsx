import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import TopBar from './TopBar'
import Navbar from './Navbar'

export default function Layout({children}) {
  return (
    <>
        <TopBar />
        {/* <Nav/> */}
        <Navbar />

        <main>
            {children}
        </main>

        <Footer />
    
    </>
  )
}
