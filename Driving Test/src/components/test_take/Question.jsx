import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import '/public/css/ques.css'

const formControlLabelStyle = {
    "& .MuiFormControlLabel-label": {
      fontSize: "18px",
      
    }
  }
const Question = (props) => {

  const [value,setValue] = useState("")
  const handleSelectOptions=(e)=>{
      setValue(e.target.value)
      props.selectOption(props.idx,e.target.value)
  }

  return (
    <div className='question-div'>
        <FormControl>
            <div className="question">{props.question_val.question}</div>
            {props.question_val.img_src !== "" ? <div className='img-ques'><img src={props.question_val.img_src} alt="sign" /></div> : null}
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="option"
                onClick={handleSelectOptions}
                value={ value && props.options[props.idx] === null ? "" : props.options[props.idx]}
            >
                <FormControlLabel className='opt' sx={{...formControlLabelStyle}} value="1" control={<Radio />} label={props.question_val.options[0]}/>
                <FormControlLabel className='opt' sx={{...formControlLabelStyle}} value="2" control={<Radio />} label={props.question_val.options[1]} />
                <FormControlLabel className='opt' sx={{...formControlLabelStyle}} value="3" control={<Radio />} label={props.question_val.options[2]} />
                <FormControlLabel className='opt' sx={{...formControlLabelStyle}} value="4" control={<Radio />} label={props.question_val.options[3]} />
            </RadioGroup>
        </FormControl>
    </div>
  )
}

export default Question