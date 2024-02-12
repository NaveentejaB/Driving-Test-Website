import React from 'react'
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

const Navbar = () => {
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = React.useState(null)

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
                <Avatar alt="Remy Sharp" src="" />
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
