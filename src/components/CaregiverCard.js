import { Check, Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const CaregiverCard = ({phone,name,experience,image,field,dob,email,education,lang,aadhar,passprops}) => {
  const[like,Setlikes]=useState(false)
  const[rating,Setrating]=useState(0)
  const[amount,setamount]=useState(0)
  const navigate = useNavigate();

  const handleclick = () =>{
    Setlikes(!like);
    if(!like){
      Setrating(rating+1);
    }
   
  }
  useEffect(() => {
    let newAmount;
    if (experience === "Less than 1 year") {
      newAmount = Math.floor(Math.random() * (600 - 500 + 1)) + 500;
    } else if (experience === "1-3 years") {
      newAmount = Math.floor(Math.random() * (800 - 700 + 1)) + 700;
    } else if (experience === "3-5 years") {
      newAmount = Math.floor(Math.random() * (1000 - 900 + 1)) + 900;
    } else {
      newAmount = Math.floor(Math.random() * (1100 - 1000 + 1)) + 1000;
    }
    setamount(newAmount);
  }, [experience]);

  const handlenavigate=(phone,name,experience,image,field,dob,email,education,lang,aadhar)=>{
    passprops(phone,name,experience,image,field,dob,email,education,lang,aadhar)
     navigate("/profile")
  }
  return (
    <div className="caregivercard">
     <div className="caregiverimage">
       <img src = {image} alt="/" height="100%" width="100%"/>
     </div>
     <div className="caredetails">
      <div className = "heart">
       <span className="username">{name}</span>
       <div className="likes"><Heart onClick={handleclick} fill={like?"rgba(3, 172, 240, 1)":"rgba(255, 255, 255, 0.3)"}/>
        {amount}
       </div>
       </div>
       <span className="aboutcaregiver">I have more than yrs of nanny/housekeeping works and i love children</span>
       <div className= "caregiverexpertise">
        <Check  fill ="rgba(3, 172, 240, 1)" color="rgba(3, 172, 240, 1)"/><span className="expertise">{field}</span>
       </div>
       <div className="allthreedetails">
       <div className="careexperience">
         <h5>Work Experience</h5>
         <ul>
          <li>{experience}</li>
         </ul>
       </div>
       <div className="Nationality">
         <h5>Nationality</h5>
         <ul>
          <li>Indian</li>
         </ul>
       </div>
       <div className="dob">
         <h5>DOB</h5>
         <ul>
          <li>{dob}</li>
         </ul>
       </div>
       </div>
       <div className="buttons">
        <a href = {`tel:${phone}`}>
        <button className="caregiverbutc">Contact</button>
        </a>
        <button className="caregiverbut" onClick={()=>handlenavigate(phone,name,experience,image,field,dob,email,education,lang,aadhar)}>View Profile</button>
       </div>
     </div>
    </div>
  )
}

export default CaregiverCard
