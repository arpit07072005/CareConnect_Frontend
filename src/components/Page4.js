import React, { useState } from 'react'




export default function Process() {
  const[text,setText]=useState(true)
  const[text1,setText1]=useState(true)
  const[text2,setText2]=useState(true)
  const[text3,setText3]=useState(true)
  const[text4,setText4]=useState(true)

  const handleClick=()=>{
    setText(!text)
  }
  const handleClick1=()=>{
    setText1(!text1)
  }
  const handleClick2=()=>{
    setText2(!text2)
  }
  const handleClick3=()=>{
    setText3(!text3)
  }
  const handleClick4=()=>{
    setText4(!text4)
  }
  return (
    <div className="page4">
      <div className="img">
        <img src="./Frame.png" alt="frame"/>
      </div>
      <div className="faq">
        <span className="faqhead">
       <h5>Frequently Asked Questions</h5>
       <span className="phot"><img src="./faqhead.png" alt="frame"/></span>
       </span>
       <div className="questions">
        <div className="whole">
        <span className="answer">
        <p className="mainq">How do I become a caregiver ?</p>
        <span className={text?"vector":"setvector"} onClick={handleClick}><img src="./img8.png" alt="vector"/></span> </span>
        <p className={text?"text":"settext"}>To become a caregiver , click on the “Become a Caregiver” button and follow the registration process.</p> 
       
        </div>
        <div className="whole">
        <span className="answer">
        <p className="mainq">What types of services can i request ?</p>
        <span className={text1?"vector":"setvector"}   onClick={handleClick1}><img src="./img8.png" alt="vector"/></span>
        </span>
        <p className={text1?"text":"settext1"}>To become a caregiver , click on the “Become a Caregiver” button and follow the registration process.</p> 
        </div>
        <div className="whole">
        <span className="answer">
        <p className="mainq">How are caregivers verified ?</p>
        <span className={text2?"vector":"setvector"}  onClick={handleClick2} ><img src="./img8.png" alt="vector"/></span>
        </span>
        <p className={text2?"text":"settext2"}>To become a caregiver , click on the “Become a Caregiver” button and follow the registration process.</p> 
        </div>
        <div className="whole">
        <span className="answer">
        <p className="mainq">What if the caregiver do not come after paying ?</p>
        <span className={text3?"vector":"setvector"}  onClick={handleClick3} ><img src="./img8.png" alt="vector"/></span>
        </span>
        <p className={text3?"text":"settext3"}>Do not worry about that if caregiver do not come to service then your money will be refunded in 24 hours.</p> 
        </div>
        <div className="whole">
        <span className="answer">
        <p className="mainq">How are caregivers verified ?</p>
        <span className={text4?"vector":"setvector"}  onClick={handleClick4} ><img src="./img8.png" alt="vector"/></span>
       </span>
       <p className={text4?"text":"settext4"}>To become a caregiver , click on the “Become a Caregiver” button and follow the registration process.</p> 
       </div>
        </div>
      </div>
    </div>
  )
}
