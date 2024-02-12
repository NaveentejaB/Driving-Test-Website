import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useBlocker } from 'react-router-dom';
import '/public/css/home.css'

const Home = () => {
  const navigate = useNavigate()
  const check = async() => {
    try{
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:3000/check',{
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
        console.log('Error processing the request' , result.message);
      }else{
        console.log(result.message);
      }
    }catch(err){
      console.log('Error processing the request' , err.message);
      console.log('happie');
      if(err.status === 403){
        console.log(403);
        localStorage.clear()
        navigate('/login')
      }
    }
  }
  useEffect(()=>{
    check()
  },[])
  const handleStartTest = async() => {
    try{
      const token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:3000/check',{
          method : 'GET',
          headers :{
              'Authorization' : token,
              'Content-Type': 'application/json',
          }
      })
      const result = await response.json()
      if(result.error){
        if(result.status === 403){
          console.log(403);
          localStorage.clear()
          navigate('/login')
        }
      }else{
        navigate('/test')
      }
    }catch(err){
      console.log('Error processing the request' , err.message);
      if(err.status === 403){
        console.log(403);
        localStorage.clear()
        navigate('/login')
      }
    }
  }
  return (
    <div className='home-main'>
      <Navbar/>
      <div className="lower-btm-div">
        <div className="test-stuff">
          <div className="instruc-head">Instruction:</div>
          <div className="hrz-line"></div>
          <div className="instr">
            <ul>
              <li>Total number of questions: 12</li>
              <li>Time allotted: 15 minutes (900 seconds).</li>
              <li>Each question carries 1 mark, there are no negative marks.</li>
              <li>Score atleast 11 marks to pass the test.</li>
              <li>DO NOT refresh the page or navigate to other page.</li>
              <li>All the best!</li>
            </ul>
          </div>
          <div className="btn-strt-test">
            <Button className='strt-test-btn' onClick={handleStartTest}  variant="contained">Start Test</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
