import React, { useState } from 'react'
import emailjs from "emailjs-com"

export default function Contact() {
    const [status, setStatus] = useState("");
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[message,setMessage]=useState("")
    const[robot,setRobot]=useState(false)
    // console.log(status)
    const validname = /^[a-zA-Z]+( [a-zA-Z]+){1,}$/;
    const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validmessage = /^[a-z0-9A-Z\.\,\? ]{10,}$/;
    const handlename=(e)=>{
        setName(e.target.value)
    }
    const handleemail=(e)=>{
        setEmail(e.target.value)
    }
    const handlemssg=(e)=>{
        setMessage(e.target.value)
    }
    const handlerobo=(e)=>{
       setRobot(e.target.checked)
    }
    const handlevalidname=()=>{
      if((!validname.test(name)) && name){
        alert("Invalid name ,Enter full name");
        return;
      } 
    }
    const handlevalidemail=()=>{
      if((!validemail.test(email)) && email){
        alert("Invalid email format.");
        return;
      }
    }
    const handlevalidmessage=()=>{
      if((!validmessage.test(message)) && message){
        alert("Message must be at least 10 characters and valid");
        return;
      }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    if((!validname.test(name)) && name){
        alert("Invalid name ,Enter full name");
        return;
      } 
    if(!name){
      alert("Enter full name");
      return; 
    }
    if((!validemail.test(email)) && email){
      alert("Invalid email format.");
      return;
    }
    if(!email){
      alert("Enter email");
      return; 
    }
    if((!validmessage.test(message)) && message){
      alert("Message must be at least 10 characters and valid ");
      return;
    }
    if(!message){
      alert("Enter message");
      return; 
    }
    if(!robot){
      alert("Please confirm you are not a robot.");
      return;
    }
        emailjs
          .send(
            "service_4r3d0ha", // Replace with your EmailJS Service ID
            "template_heuei0i", // Replace with your EmailJS Template ID
            {
                name,              // Passing individual fields
                email,
                message,
              },
            "R_SWFGG_XmrW_H6yx" // Replace with your EmailJS Public User ID
          )
          .then(
            (response) => {
              // console.log("SUCCESS!", response.status, response.text);
              setStatus("Email sent successfully!");
            },
            (error) => {
              console.error("FAILED...", error);
              setStatus("Failed to send email. Please try again later.");
            }
          );
          const updatename="Full Name"
          const updateemail="Email Address"
          const updatemessage="Enter your Message"

          setName("")
          setEmail("")
          setMessage("")
          setRobot(false)
        }
  return (
    <div className="page6" id="contactus">
      <h4>CONTACT US</h4>
      <div className="contactimg" >
        <div className="contactform">
            <p>If you have any queries, drop them here</p>
            <span className="inputfield">
            <span className="inputfield1">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder='Full Name' value={name} name="name" onChange={handlename} onBlur={handlevalidname}/>
            </span>
            <span className="inputfield2">
            <label htmlFor="email">Email</label>
            <input type="text" placeholder='Email Address' value={email} name="email" onChange={handleemail} onBlur={handlevalidemail}/>
            </span>
            </span>
            <label htmlFor="message">Message</label>
            <input type="text" placeholder='Enter your Message' value={message} name="message" onChange={handlemssg}  className="mssg" onBlur={handlevalidmessage}/>
            <span className="checkbox"><input type="checkbox" name="robot" checked={robot} placeholder="I'm not a robot" onChange ={handlerobo}/>I'm not a robot</span>
            <button className="send" onClick={handleSubmit}>Send</button>

        </div>
        <div className="childimg">
        <img src='./contact.png' alt="frame"/>
        </div>
      </div>
    </div>
  )
}
