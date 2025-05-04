import axios from 'axios';
import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = ({handlemaster}) => {
  const navigate=useNavigate();
  const[name,setName]=useState();
  const[password,setPassword]=useState();
  const[logindata,setlogindata]=useState([]);
  
  
  
 const handleChange=(e)=>{
  if(e.target.className==="username"){
    setName(e.target.value)
    
  }
  else{
    setPassword(e.target.value)
    
  }

  }

  const Handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://semicolon-backend-p6v3.onrender.com/api/v1/user/login/fetch`);
      console.log(response.data);
  
      const user = response.data.data.find(
        (user) => user.username === name && user.password === password
      );
  
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        console.log("Login Successful");
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error("Invalid Credentials");
        navigate("/Signup")
      }
     handlemaster(user)
    } catch (error) {
      console.log("error in fetching the data", error);
      alert("Something went wrong while logging in");
    }
    
  };
  

  return (
    <div className="login">
        <div className="logform">
          <h3>WELCOME BACK!</h3>
          <span>Don't have a account,<Link to="/signup">< span className="valid">Sign up</span></Link> </span>
          <form className="loginform">
            <label htmlFor='username'>Username</label>
            <input type="text" value={name} className="username" onChange={handleChange}/>
            <label htmlFor='password'>Password</label>
            <input type="text" value={password} className="password" onChange={handleChange}/>
            <div className="remember">
            <input type="radio" className="radio" value="Remember me"/>
            <span className="rem">Remember me</span>
            </div>
            <button className="signin" onClick={Handlelogin}>Sign In</button>

          </form>
        </div>
        <div className="logimg">
         <img src="./doc.png" alt="frame"/>
         <div className="full">Compassion Meets<span className="uhv">Care</span></div>
        </div>
      
    </div>
  )
}

export default Login
