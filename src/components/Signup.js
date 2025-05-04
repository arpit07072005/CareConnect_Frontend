
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
    const[name,setName]=useState();
      const[password,setPassword]=useState();
      const[email,setEmail]=useState();
    
      const navigate=useNavigate();
      
     const handleChange=(e)=>{
      if(e.target.className==="username"){
        setName(e.target.value)
      }
        
      else if(e.target.className==="email"){
        setEmail(e.target.value)
        
      }
      else{
        setPassword(e.target.value)
        
      }
    
      }

      const Handlesignup=async (e)=>{
        e.preventDefault()
       const data = {
        name,
        email,
        password
       }
       console.log(data)
       try{
         const response = await axios.post(`https://semicolon-backend-p6v3.onrender.com/api/v1/user/signup/register`,{
         
        username:data.name,
        email:data.email,
        password:data.password
      })
       console.log("signup Successfull",response.data)
       
       
       toast.success("Signup Successfull")
       navigate("/Login")
       }catch(error){
           console.log("error",error)
           toast.error("error",error)
       }
     
    
      }
    return (
        <div className="login">
            <div className="logform">
              <h3>Sign Up</h3>
              <form className="loginform">
                <label htmlFor='username'>Username</label>
                <input type="text" value={name} className="username" onChange={handleChange}/>
                <label htmlFor='email'>Email</label>
                <input type="text" value={email} className="email" onChange={handleChange}/>
                <label htmlFor='password'>Password</label>
                <input type="text" value={password} className="password" onChange={handleChange}/>
                <div className="remember">
                <input type="radio" className="radio" value="Remember me"/>
                <span className="rem">Remember me</span>
                </div>
                <button className="signin" onClick={Handlesignup}>Sign Up</button>
    
              </form>
            </div>
            <div className="logimg">
             <img src="./doc.png" alt="frame"/>
             <div className="full">Compassion Meets<span className="uhv">Care</span></div>
            </div>
          
        </div>
      )
    }

export default Signup
