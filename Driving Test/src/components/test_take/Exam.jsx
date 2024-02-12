import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Question from './Question';

import questions from '../../../public/questions';
import '/public/css/test.css'

const Exam = () => {
    const navigate = useNavigate()

    const [selected_options,setSelectedOptions] = useState(
      [null,null,null,null,null,null,null,null,null,null,null,null])
    const [seconds,setSeconds] = useState(0)
    const [minutes,setMinutes] = useState(15)
    const [curIndex,setCurIndex] = useState(0)
    const handleClickOnDiv = (index) =>{
      setCurIndex(index)
    }

    const change_selected_option = (index,value) =>{
      const options = selected_options
      options[index] = value
      setSelectedOptions(options)
    }
    
    const updateInDatabase = async() =>{
      try{
        const token = localStorage.getItem('access_token')
        let score=[0,0,0]
        questions.map((question,index)=>{
          if(index<4){
            if(question.correct_ans === selected_options[index])
              score[0] += 1
          }else if(index>=4 && index<8){
            if(question.correct_ans === selected_options[index])
              score[1] += 1
          }else{
            if(question.correct_ans === selected_options[index])
              score[2] += 1
          }
        })
        const mini = Math.min(...score)
        const idx = score.indexOf(mini)
        const tot = score[0]+score[1]+score[2]
        
        const data = {
          score : tot,
          status : tot > 10 ? true : false,
          feedBack : idx
        }
        console.log('resquest sending');
        console.log(data);
        const response = await fetch('http://localhost:3000/update_result',{
            method : 'POST',
            headers :{
                'Authorization' : token,
                'Content-Type': 'application/json',
            },
            body : JSON.stringify(data)
        })
        const result = await response.json()
        if(response.status === 403){
          localStorage.clear()
          navigate('/login')
        }
        if(result.error){
          console.log('Error processing the request' , result.message);
        }else{
          navigate('/result')
          
        }
      }catch(err){
        console.log('Error processing the request' , err.message);
      }
    }
    
    const handleSubmit = (e) =>{
      e.preventDefault()
      setMinutes(0)
      setSeconds(0)
    }

    useEffect(()=>{
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          updateInDatabase()
        }
      }, 1000);
  
      return () => clearInterval(interval);
    },[seconds,minutes])

  return (
    <div className='container-fluid main-x'>
      <div className="row main-x">
        <div className="col-md-4 left-bar">
          <div className="timer-div">
            <label htmlFor="timer">Time left :</label>
            <div className="timer-val">{minutes} : {seconds} </div>
          </div>
          <div className='indic-div'>
          
            {selected_options.map((selected_option,index)=>(
              <div key={index} className="indic" onClick={()=>handleClickOnDiv(index)}
                style={{background: curIndex === index ? '#3995e6' : '#afafaf' && selected_option !== null ? '#6752bc' : '#afafaf'}} >{index+1}</div>
            ))}
          </div>
          <div className="submit-btn-div">
            <Button className="submit-btn" onClick={handleSubmit} variant="contained">Submit</Button>
          </div>
        </div>
        <div className="col-md-8 right-bar">
            <Question question_val={questions[curIndex]} idx={curIndex}
              selectOption={change_selected_option} options={selected_options}/>
        </div>
      </div>
    </div>
  );
}

export default Exam;


