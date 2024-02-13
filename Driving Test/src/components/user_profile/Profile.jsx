import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import {triggerBase64Download} from 'react-base64-downloader'
import '/public/css/profile.css'

const Profile = (props) => {
  const [bio,setBio] = useState(null)
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
      }else{
          const obj = result.data
          setBio(obj)
          console.log(result.message)
      }
    }catch(err){
        console.log('Error proccessing the request:',err.message)
    }
  }
  
  useEffect(()=>{
    fetchUserDetails()
  },[])
  return (
    <div className='profile-main'>
      <div className="update-btn-div">
        <Button className='update-btn' onClick={()=>props.changeState(true)} variant="contained"><EditIcon sx={{fontSize:16,marginRight:1}}/>  Update</Button>
      </div>
      <div className="details-txt-div">
        <div className="details-txt-val-div">
            <div className="details-txt-val">
                <div className="label-txt">Name</div>
                <div className="txt-val">{bio === null ? "" : bio.user_name }</div>
            </div>
            <div className="details-txt-val">
                <div className="label-txt">Contact Number</div>
                <div className="txt-val">{bio === null ? "" : bio.user_contact }</div>
            </div>
        </div>
        <div className="details-txt-val-div adres-div">
            <div className="details-txt-val">
                <div className="label-txt">email</div>
                <div className="txt-val">{bio === null ? "" : bio.user_email }</div>
            </div>
            <div className="details-txt-val ">
                <div className="label-txt">Address</div>
                <div className="txt-val address">{bio === null ? "" : bio.user_address }</div>
            </div>
        </div>
      </div>
      <div className="hrz-line"></div>
      <div className="photo-proof-div">
        <div className="photo-div-par">
            <label htmlFor="photo" className='label-txt'>Photo</label>
            <div className="photo-div img-div" name='photo'>
                <img src={bio === null ? "" : "data:image/png;base64,"+bio.user_photo} alt="" />
            </div>
        </div>
        <div className="photo-div-par">
            <label htmlFor="proof" className='label-txt'>Adhaar proof</label>
            <div className="photo-div img-div" name='proof'>
                <img src={bio === null ? "" :"data:image/png;base64,"+bio.user_proof} alt='' />
            </div>
        </div>
      </div>
      <div className="licencse-div">
        <div className="licence-txt label-txt">License</div>
        <div className="hrz-line"></div>
        <div className="lic-div-child">
            <div className="lic-img-div">
                <img src={bio === null ? "" :"data:image/png;base64,"+ bio.user_license} alt="" />
            </div>
            <div className="download-btn-div">
                <Button className='update-btn download' onClick={()=> triggerBase64Download("data:image/png;base64,"+ bio.user_license, 'license')} id='download-btn' variant="contained"><EditIcon sx={{fontSize:16,marginRight:1}}/> Download</Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
