import React, { useState } from 'react'
import emailjs from "emailjs-com"
import { Link, useNavigate } from 'react-router-dom'; 
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
      <div className="contactimg" >
        <div className="leftContact">
      <h4>Care<span className="logo">Connect</span></h4>
          <p>We provide compassionate, reliable and prffessional caregivers to support families
and individuals in need.
</p>
<p>Location:  Random,
sector23213123</p>
<p>+91 1214875324,
+91 734678642
</p>
        </div>
        <div className="contactlinks">
          <h4>Quick Links</h4>
          <a href="#page1"><li>Home</li></a>
             <a href="#page2service"><li>Services</li></a>
          <a href="#page3"><li>Testimonials</li></a>
          <a href="#faq"><li>FAQs</li></a>
        </div>
       <div className="contactform">
            <h4>Contact Us</h4>
            <span className="inputfield">
            <span className="inputfield1">
            <input type="text" placeholder='Full Name' value={name} name="name" onChange={handlename} onBlur={handlevalidname}/>
            </span>
            <span className="inputfield2">
           
            <input type="text" placeholder='Email Address' value={email} name="email" onChange={handleemail} onBlur={handlevalidemail}/>
            </span>
            </span>
            <input type="text" placeholder='Enter your Message' value={message} name="message" onChange={handlemssg}  className="mssg" onBlur={handlevalidmessage}/>
            <button className="send" onClick={handleSubmit}>Send</button>

        </div>
      
      </div>
    </div>
  )
}
