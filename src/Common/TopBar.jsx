import { Box } from '@mui/material'
import React from 'react'

import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import SettingsPhoneIcon from '@mui/icons-material/SettingsPhone';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';


import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function TopBar() {

    return (
        <>
            <Box component="div" sx={{ backgroundColor: "black", color: "white", height: "35px", display: "flex", flexGrow : "1", alignItems: "center", fontSize: "15px", fontFamily: "serif" }}>
                <Box component="div" padding="60px" >

                    <MarkEmailUnreadRoundedIcon fontSize='small' />  blog@yourdomain.com
                    <span style={{ paddingLeft: "180px" }}>
                        <SettingsPhoneIcon fontSize='small' /> +(121)24695500
                    </span>

                </Box>

                <Box component="div" sx={{marginLeft : "auto", paddingRight : "40px"}}>
                    <span style={{paddingRight :"20px"}}><FaTwitter size="1.2em" /> Twitter</span>

                    <span style={{paddingRight :"20px"}}><FacebookOutlinedIcon fontSize='small' /> Facebook</span>

                    <span ><AiFillInstagram size="1.45em"/> Instagram</span>
                    
                    
                    

                </Box>
            </Box>
        </>
    )
}
