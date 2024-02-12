import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '/public/css/update.css'

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const Profile_update = (props) => {
  const [details,setDetails] = useState({
    name : '',
    address : '',
    phone : '',
    photo : null,
    proof : null,

  })
  
  const [bio,setBio] = useState(null)
  const fetchUserDetails = async() =>{
    try{
      
      const admin_token = localStorage.getItem('access_token')
      const response = await fetch('http://localhost:3000/details',{
          method : 'GET',
          headers :{
              'Authorization' : admin_token,
              'Content-Type': 'application/json',
          }
      })
      const result = await response.json()
      if(result.error){
          console.log('Error proccessing the request:',result.message)
          if(response.status === 403)
            navigate('/login')
      }else{
          const obj = result.data
          setBio(obj)
          setDetails({
            name : obj.user_name,
            address : obj.user_address,
            phone : obj.user_contact
          })
      }
    }catch(err){
        console.log('Error proccessing the request:',err.message)
    }
  }
  useEffect(()=>{
    fetchUserDetails()
  },[])
  const handleChange = (e) =>{
    const {value,name} = e.target
    setDetails({
        ...details,
        [name] : value
    })
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const {name} = event.target
    console.log(name);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const value = reader.result
        setDetails({
            ...details,
            [name] : value
        });
      };

      reader.readAsDataURL(file);
    }
  } 
  
  const handleSaveDetails = async(e) => {
    e.preventDefault()
    try{
        if(details.photo)
          details.photo=details.photo.replace('data:image/jpeg;base64,','')
        if(details.proof)
          details.proof=details.proof.replace('data:image/jpeg;base64,','')
        const acess_token = localStorage.getItem('access_token')
        const response = await fetch('http://localhost:3000/details',{
            method : 'POST',
            headers :{
                'Authorization' : acess_token,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(details)
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
            setDetails({
              name : obj.user_name,
              address : obj.user_address,
              phone : obj.user_contact
            })
            console.log(result.message);
        }
        props.changeState(false)
      }catch(err){
          console.log('Error proccessing the request:',err.message)
      }
  }
  return (
    <div className='update-main'>
        <h4>Update the Details:</h4>
        <div className="hrz-line"></div>
        <div className="update-feilds-div">
            <div className="feilds-div">
                <TextField className='inpt' name='name' onChange={handleChange} id="outlined-basic" value={bio === null? "": details.name} label="Name" variant="outlined" />
                <TextField className='inpt' name='phone' onChange={handleChange} id="outlined-basic" value={bio === null? "": details.phone} label="Contact Number" variant="outlined" />
            </div>
            <div className="feilds-div">
                <TextField className='inpt_addres' onChange={handleChange} name='address' value={bio === null? "": details.address} id="outlined-basic" label="Address" variant="outlined" />
            </div>
        </div>
        
        <div className="phts-div-par">
            <div className="pht-div">
                <label htmlFor="photo">Photo</label>
                <Button component="label" onClick={handleImageUpload} style={{background: '#4931a8' }} variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                <VisuallyHiddenInput name='photo' onChange={handleImageUpload} type="file" />
                </Button>
                <div className="preview-tab">
                    <img src={bio===null?"":details.photo} alt="" />
                </div>
            </div>
            <div className="pht-div">
                <label htmlFor="photo">Adhaar</label>
                <Button component="label"  style={{background: '#4931a8' }} variant="contained" startIcon={<CloudUploadIcon />}>
                    Upload file
                <VisuallyHiddenInput name='proof' type="file" onChange={handleImageUpload} />
                </Button>
                <div className="preview-tab">
                    <img src={bio===null?"":details.proof} alt="" />
                </div>
            </div>
        </div>
        <div className="btn-grps">
            <Button className='cancel-btn btn' onClick={()=>props.changeState(false)} variant="contained">cancel</Button>
            <Button className='save-btn btn' onClick={handleSaveDetails} variant="contained">save</Button>
        </div>
    </div>
  )
}

export default Profile_update