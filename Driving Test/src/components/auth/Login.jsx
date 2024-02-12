import React, { useState } from 'react'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import '/public/css/login.css'


const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [loginDetails,setLoginDetails] = useState({
    email : '',
    password : ''
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const navigate = useNavigate()

  const handle_click_sign_up = () => {
    navigate('/signup')
  }
  const handle_change = (e) => {
    const {name,value} = e.target
    setLoginDetails({
      ...loginDetails,
      [name] : value
    })
  }
  const handle_login = async(e) =>{
    e.preventDefault()
    try{
      console.log(loginDetails);
      const response = await fetch('http://localhost:3000/login',{
                method : 'POST',
                headers :{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(loginDetails)
            })
            const result = await response.json()
            if(result.error){
                console.log('Error proccessing the request:',result.message)
                navigate('/login')
            }else{
                localStorage.setItem('access_token',result.accessToken)
                console.log(result.message)
                navigate('/')
            }
    }catch(err){
      console.log('Error proccessing the request :',err.message);
    }
  }
  return (
    <div className='main'>
      <div className="login_box">
        <DirectionsCarIcon className='car-icon' sx={{color:'#4931a8',fontSize: 50}}/>
        <div className="logo-txt"> Driving Test </div>
        <TextField className='txt-feild' name='email' onChange={handle_change} value={loginDetails.email} id="outlined-basic" type='email' label="Email" variant="outlined" />
        <FormControl className='txt-feild' variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={loginDetails.password}
              name='password'
              onChange={handle_change}
              endAdornment={
              <InputAdornment position="end">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                  >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
              </InputAdornment>
              }
              label="Password"
          />
        </FormControl>
        <Button className='login-btn' style={{background:'#4931a8'}} onClick={handle_login} variant="contained">Login</Button>
        <div className="btm-txt-login">
          <div className="login-txt-one">Don't have a account? </div>
          <div className="register-nav"  onClick={handle_click_sign_up} >Sign up</div>
        </div>
      </div>
    </div>
  )
}

export default Login
