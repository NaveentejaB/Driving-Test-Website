import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import '/public/css/register.css'

const Register = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false)
    const [signupDetails,setSignupDetails] = useState({
        name : '',
        address : '',
        password : '',
        email : '',
        phone : ''
    })
    const handleClickShowPassword = () => setShowPassword((show) => !show)
    
    const handle_change = (e) => {
        const {name,value} = e.target
        setSignupDetails({
            ...signupDetails,
            [name] : value
        })
    }
    const handle_signup = async(e) => {
        e.preventDefault()
        try{
            const data = signupDetails
            console.log(signupDetails)
            const response = await fetch('http://localhost:3000/signup',{
                method : 'POST',
                headers :{
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(data)
            })
            const result = await response.json()
            if(result.error){
                console.log('Error proccessing the request:',result.message)
                navigate('/signup')
            }else{
                localStorage.setItem('access_token',result.accessToken)
                console.log(result.message)
                navigate('/')
            }
        }catch(err){
            console.log('Error proccessing the request:',err.message)
        }
    }
    
    const handle_click_login = () => {
        navigate('/login')
    }
    return (
        <div className='main'>
            <div className="register-box">
                <div className="log-txt">
                    <DirectionsCarIcon className='car-icon' sx={{color:'#4931a8',fontSize: 50}}/>
                    <div className="logo-txt"> Driving Test </div>
                </div>
                <TextField className='txt-feild' name='email' onChange={handle_change} value={signupDetails.email} id="outlined-basic" type='email' label="Email" variant="outlined" />
                <TextField className='txt-feild' name='name' onChange={handle_change} value={signupDetails.name} id="outlined-basic" type='text' label="Name" variant="outlined" />
                <TextField className='txt-feild' name='address' onChange={handle_change} value={signupDetails.address} id="outlined-basic" type='text' label="Address" variant="outlined" />
                <TextField className='txt-feild' name='phone' onChange={handle_change} value={signupDetails.phone} id="outlined-basic" type='tel' label="Contact Number" variant="outlined" />
                <FormControl className='txt-feild' variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        value={signupDetails.password}
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
                {/* <TextField className='txt-feild' id="outlined-basic" type='password' label="Password" variant="outlined" /> */}
                <Button className='login-btn' style={{background:'#4931a8'}} onClick={handle_signup} variant="contained">Sign up</Button>
                <div className="btm-txt-login">
                    <div className="login-txt-one">Already have a account? </div>
                    <div className="register-nav" onClick={handle_click_login}>Login here</div>
                </div>
            </div>
        </div>
    )
}

export default Register
