import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../home/Navbar'
import '/public/css/result.css'

const Result = () => {
    const navigate = useNavigate()
    const [result,setResult] = useState({
        score : 0,
        btn_text : '',
        final_txt : ''
    })
    const [loading,setLoading] = useState(true)
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
                let improve = ""
                switch (obj.user_result.area_of_improvement) {
                    case 0:
                        improve = "Traffic rules"   
                        break;
                    case 1:
                        improve = "Traffic signs"
                        break;
                    case 2:
                        improve = "Traffic safety"
                        break;
                    default:
                        improve = ""
                        break;
                }
                setResult({
                    score : obj.user_result.score,
                    btn_text : obj.user_result.status ? "Passed" : "Failed",
                    final_txt : obj.user_result.status ? "Congrats! Download the license from your profile." : "Area of improvement :" + improve
                })
                setLoading(false)
                console.log(result.message);
            }
        }catch(err){
            console.log('Error proccessing the request:',err.message)
        }
    }
    useEffect(()=>{
        fetchUserDetails()
    },[])
    return (
        <div className='home-main'>
            <Navbar/>
            <div className="result-div">
                <div className="result">
                    <div className="score-div">
                        <div className="score-head">Score :</div>
                        <div className="score-val">{loading ? "":result.score}/12</div>
                    </div>
                    <div className="pass-fail-div">
                        <div className="pass-fail-txt" style={{background: result.btn_text === "Passed" ? "#4931a8" : "#b2bbc2" }}>
                            {loading ? "":result.btn_text}</div>
                    </div>
                    <div className="txt-for-lice">
                        {loading ? "":result.final_txt}
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Result