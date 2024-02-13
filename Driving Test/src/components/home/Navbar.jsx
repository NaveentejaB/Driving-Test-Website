import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { useNavigate } from 'react-router-dom'
import '/public/css/navbar.css'

const settings = ['Profile', 'Logout']

const Navbar = (props) => {
  const navigate = useNavigate()
  const [image,setImage] = useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const fetchUserDetails = async() =>{
    try{
      
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:3000/details',{
          method : 'GET',
          headers :{
              'Authorization' : token,
              'Content-Type': 'application/json',
          }
      })
      const result = await response.json()
      if(response.status === 403){
        localStorage.clear()
        navigate('/login')
      }
      if(result.error){
          console.log('Error proccessing the request:',result.message)
          if(response.status === 403){
            localStorage.clear()
            navigate('/login')
          }
      }else{
          setImage(result.data.user_photo)
      }
    }catch(err){
        console.log('Error proccessing the request:',err.message)
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[])
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleNavigationMenu = (idx) => {
    if(idx === 0)
      navigate('/profile')
    else{
      //delete the session token
      localStorage.clear()
      navigate('/login')
    }
    
  }
  console.log(props.profileUrl);
  return (
    <AppBar className='app-bar' position="static">
      <Container maxWidth="xl" className='app-bar'>
        <Toolbar disableGutters className='nav-par'>
          <div className='logo-logo-name'>
            <DirectionsCarIcon className='hvr' onClick={()=>navigate('/')} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1,color:'#4931a8',fontSize:40 }} />
            <Typography
              className='hvr'
              onClick={()=>navigate('/')}
              noWrap
              sx={{
                mr: 2,
                display: { md: 'flex' },
                fontSize:20,
                fontWeight: 700,
                color: 'black',
                textDecoration: 'none',
              }}
            >
              Driving Test
            </Typography>
          </div>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={"data:image/png;base64,"+image} />
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
              {settings.map((setting,i) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography onClick={()=>handleNavigationMenu(i)} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
