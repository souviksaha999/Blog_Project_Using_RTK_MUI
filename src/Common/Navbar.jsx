import PropTypes from 'prop-types';
import React from 'react'

// import { AppBar, Box, Button, Container, Stack, Toolbar, Tooltip, Typography, Menu, Avatar, IconButton, MenuItem } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';

import PhonelinkSharpIcon from '@mui/icons-material/PhonelinkSharp';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/AuthSlice';
import { Avatar, IconButton, Menu, Tooltip } from '@mui/material';

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};




function Navbar({ mode, toggleColorMode }) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };



    const { UserData, LogoutToggle } = useSelector((state) => {
        console.log("NAVBAR_STATE...", state?.auth)
        return state?.auth
    });
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }

    const name = localStorage.getItem("name")

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElAbout, setAnchorElAbout] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenAboutMenu = (event) => {
        setAnchorElAbout(event.currentTarget);
    };


    const handleCloseAboutMenu = () => {
        setAnchorElAbout(null);
    };

    const About = `About`

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 4.5,
                }}
            >
                <Container maxWidth="xxl">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    // ? 'rgba(255, 255, 255, 0.4)'
                                    ? 'rgb(248,248,248,0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            // bgcolor: "#F8F8F8",
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            {/* <img
                                src={
                                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                                }
                                
                                style={logoStyle}
                                alt="logo of sitemark"
                            /> */}
                            {/* <img
                                src="./online-learning.png"
                                width= "20px" height="30px" 
                                style={logoStyle}
                                alt="logo of sitemark"
                            /> */}


                            {/* <span style={{marginLeft : "200px", color: "#1bbd36"}}><PhonelinkSharpIcon fontSize='large'  /></span> */}
                            <span style={{ marginLeft: "200px", color: "#1bbd36" }}>  <img
                                src="./computer.png"
                                // style={logoStyle}
                                alt="logo of sitemark"
                                style={{ height: "55px", width: "80px" }}
                            /> </span>

                            <Typography varient="h1" component="div" sx={{ flexGrow: 1, fontSize: "25px", fontWeight: "bold", marginLeft: "10px", color: "#1bbd36" }}>BLOGS</Typography>


                        </Box>

                        <MenuItem
                            onClick={() => scrollToSection('features')}
                            sx={{ py: '6px', px: '12px' }}
                        >
                            <Typography variant="body2" >
                                <Link to='/' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>HOME</Link>
                            </Typography>
                        </MenuItem>

                        {
                            !LogoutToggle ? (
                                <>
                                    <Box
                                        sx={{
                                            display: { xs: 'none', md: 'flex' },
                                            gap: 0.5,
                                            alignItems: 'center',
                                        }}
                                    >
                                        {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                                        <Button
                                            // color="primary"
                                            variant="text"
                                            size="small"
                                            component="a"
                                            href="/material-ui/getting-started/templates/sign-in/"
                                            target="_blank"
                                            sx={{ color: "black" }}

                                        >
                                            <Link to='/login' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "14px" }}>Log_In</Link>
                                        </Button>
                                        <Button
                                            // color="primary"
                                            variant="contained"
                                            size="small"
                                            component="a"
                                            href="/material-ui/getting-started/templates/sign-up/"
                                            target="_blank"
                                            sx={{ backgroundColor: "#1bbd36", color: "white" }}
                                        >
                                            <Link to='/reg' style={{ color: 'white', textDecoration: "none", fontSize: "14px" }}>Register</Link>
                                        </Button>
                                    </Box>

                                </>
                            ) : (
                                <>
                                    <Box sx={{ display: { xs: 'none', md: 'flex', paddingRight: "8vw" } }}>
                                        <MenuItem
                                            onClick={() => scrollToSection('features')}
                                            sx={{ py: '6px', px: '12px' }}
                                        >
                                            <Typography variant="body2" >
                                                <Link to='/allblogs' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>BLOG</Link>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => scrollToSection('features')}
                                            sx={{ py: '6px', px: '12px' }}
                                        >
                                            <Typography variant="body2" >
                                                <Link to='/allservices' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>SERVICES</Link>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => scrollToSection('features')}
                                            sx={{ py: '6px', px: '12px' }}
                                        >
                                            <Typography variant="body2" >
                                                <Link to='/allcourses' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>COURSES</Link>
                                            </Typography>
                                        </MenuItem>
                                        <Box sx={{ flexGrow: 0 }}>
                                            {/* <Tooltip title="Open settings"> */}
                                            <IconButton onClick={handleOpenAboutMenu} sx={{ p: 0, color: "#1bbd36" }}>
                                                <Button color='inherit' fontSize="12px" style={{ fontWeight: "bold" }}> About</Button>
                                                <ExpandMoreIcon sx={{ color: "#1bbd36 !important" }} size='large' />
                                            </IconButton>
                                            {/* </Tooltip> */}
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElAbout}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElAbout)}
                                                onClose={handleCloseAboutMenu}
                                            >
                                                <MenuItem onClick={handleCloseAboutMenu} >
                                                    <Typography textAlign="center">

                                                        <Button color='inherit'> <Link to='/teams' style={{ color: '#1bbd36', fontSize: "12px", textDecoration: "none" }}>Teams</Link></Button><br />
                                                        <Button color='inherit'> <Link to='/testimonials' style={{ color: '#1bbd36', fontSize: "12px", textDecoration: "none" }}>Testimonials</Link></Button>


                                                    </Typography>


                                                </MenuItem>

                                            </Menu>
                                        </Box>

                                        <MenuItem
                                            onClick={() => scrollToSection('features')}
                                            sx={{ py: '6px', px: '12px' }}
                                        >
                                            <Typography variant="body2" >
                                                <Link to='/contact' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "14px", fontWeight: "bold" }}>CONTACT US</Link>
                                            </Typography>
                                        </MenuItem>

                                        <Box sx={{ flexGrow: 0 }}>
                                            <Tooltip title="Open settings">
                                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                    {/* <Avatar alt={auth?.user?.name} src={`${process.env.REACT_APP_BASE_URL}${auth?.user?.photo}`} /> */}
                                                    {/* <Avatar alt={name} src="" /> */}
                                                    {/* <Avatar alt={name} src={`${process.env.REACT_APP_BASE_URL}${UserData?.user?.photo}`} height="30px" /> */}
                                                    <Avatar alt={name} src={` https://restapinodejs.onrender.com/api/${UserData?.user?.photo}`} height="30px" />
                                                    <ExpandMoreIcon sx={{ color: "#1bbd36 !important" }} size='large' />
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                sx={{ mt: '45px' }}
                                                id="menu-appbar"
                                                anchorEl={anchorElUser}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={Boolean(anchorElUser)}
                                                onClose={handleCloseUserMenu}
                                            >
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">

                                                        {/* <img src={`https://restapinodejs.onrender.com/${auth?.user?.photo}`} alt="Photo" height="150px"/><br /> */}
                                                        <Button color='inherit'> <Link to='' style={{ color: '#1bbd36', fontSize: "12px", textDecoration: "none" }}>{name}</Link></Button><br />
                                                        <Button color='inherit'> <Link to='/updatepassword' style={{ color: '#1bbd36', fontSize: "12px", textDecoration: "none" }}>Update Password</Link></Button><br />
                                                        <Button color='inherit' onClick={handleLogout}> <Link to='/login' style={{ color: '#1bbd36', fontSize: "12px", textDecoration: "none" }}>Log_Out</Link></Button>

                                                    </Typography>


                                                </MenuItem>

                                            </Menu>
                                        </Box>




                                    </Box>

                                </>
                            )
                        }





                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                            <Button
                                variant="text"
                                color="success"
                                aria-label="menu"
                                onClick={toggleDrawer(true)}
                                sx={{ minWidth: '30px', p: '4px' }}
                            >
                                <MenuIcon />
                            </Button>
                            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                                <Box
                                    sx={{
                                        minWidth: '60dvw',
                                        p: 2,
                                        backgroundColor: 'background.paper',
                                        flexGrow: 1,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                            flexGrow: 1,
                                        }}
                                    >
                                        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                                    </Box>
                                    <MenuItem onClick={() => scrollToSection('blogs')}>
                                        <Link to='/allblogs' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>Blogs</Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('services')}>
                                        <Link to='/allservices' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>Services</Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('courses')}>
                                        <Link to='/allcourses' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>Courses</Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('teams')}>
                                        <Link to='/teams' style={{ color: '#1bbd36', fontSize: "18px", textDecoration: "none", fontWeight: "bold" }}>Teams</Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('testimonials')}>
                                        <Link to='/testimonials' style={{ color: '#1bbd36', fontSize: "18px", textDecoration: "none", fontWeight: "bold" }}>Testimonials</Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => scrollToSection('contact_us')}>
                                        <Link to='/contact' style={{ color: '#1bbd36', textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>Contact Us</Link>
                                    </MenuItem>
                                    <Divider />
                                    <div>
                                        <Button color='inherit'> <Link to='' style={{ color: '#1bbd36', fontSize: "16px", fontWeight: "bold", textDecoration: "none" }}>{name}</Link></Button><br />

                                    </div>
                                    <MenuItem>

                                        {/* <Button
                                            color="primary"
                                            variant="contained"
                                            component="a"
                                            href="/material-ui/getting-started/templates/sign-up/"
                                            target="_blank"
                                            sx={{ width: '100%' }}
                                        >
                                            Sign up
                                        </Button>
                                    </MenuItem>
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            component="a"
                                            href="/material-ui/getting-started/templates/sign-in/"
                                            target="_blank"
                                            sx={{ width: '100%' }}
                                        >
                                            Sign in
                                        </Button> */}


                                    </MenuItem>
                                    <Button color='inherit'> <Link to='/updatepassword' style={{ color: '#1bbd36', fontSize: "16px", fontWeight: "bold", textDecoration: "none" }}>Update Password</Link></Button><br />
                                    <Button color='inherit' onClick={handleLogout}> <Link to='/login' style={{ color: '#1bbd36', fontSize: "16px", fontWeight: "bold", textDecoration: "none" }}>Log_Out</Link></Button>
                                </Box>
                            </Drawer>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
    toggleColorMode: PropTypes.func.isRequired,
};

export default Navbar;