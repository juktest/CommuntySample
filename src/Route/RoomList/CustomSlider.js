import React, { Component, useState } from 'react'
import Slider from 'react-rangeslider'

const CustomSlider = ({min,max,step,value})=>{

  const [state, setState] = useState({
      min,
      max,
      step,
      volume : value
  });

  const handleOnChange = (value) => {
    setState({...state,
      volume : value
    })
  };

    return (
      <>
      <div>{state.volume}</div>
      <Slider
        min = {state.min}
        max = {state.max}
        step = {state.step}
        value = {state.volume}
        onChange={handleOnChange}
        labels = {{ 0: '0', 100: '5'}}
      />
      </>
    )
}

export default CustomSlider;