import React, { useEffect, useState } from 'react';
import Navbar from '../home/Navbar';
import Profile from './Profile';
import Profile_update from './Profile_update';
import '/public/css/user_profile.css'

const User_profile = () => {
  const[isUpdatePressed,setIsUpdatePressed] = useState(false)


  const handleUpdateToggle = (value) =>{
    setIsUpdatePressed(value)
  }
  
  return (
    <div className='home-main'>
      <Navbar />
      <div className="display-profile" style={{height: isUpdatePressed ? '90vh' : '130vh'}}>
        { isUpdatePressed ? <Profile_update  changeState={handleUpdateToggle} /> : <Profile  changeState={handleUpdateToggle}/>}
      </div>
    </div>
  );
}

export default User_profile;
