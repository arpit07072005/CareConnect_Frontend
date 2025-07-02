import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate  } from 'react-router-dom'; 
import { toast } from 'react-toastify'
import  { SquareX, Star } from "lucide-react";
import axios from 'axios';

export default function Navbar({ master , setmaster , pass , client , payid}) {
  const [menuopen, setMenuopen] = useState(false);
  
  const[navmodal,Setnavmodel]=useState(false)
  const[clientnavmodal,Setclientnavmodel]=useState(false)
  const navigate = useNavigate();
  const[button,setbutton]=useState(true)
   const[button1,setbutton1]=useState(true)
  const[booked,setbooked]=useState([])
  const[bookedclient,setbookedclient]=useState([])
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const[clientrating,setclientRating]=useState(false)
  const[caregiverrating,setcaregiverRating]=useState(false)
  const[review,setReview]=useState("")

  const { phone, name, image, email, aadhar } = pass;
  


  const handleMenu = () => {
    setMenuopen(true);
  };

  const handleMenuClose = () => {
    setMenuopen(false);
  };

  const handleLogout = () => {
    setmaster(null);
    localStorage.removeItem("master");
    toast.success("Logout Successful");
    navigate("/");
  };

  const handleremove = () => {
   Setnavmodel(false)
   Setclientnavmodel(false)
  };

  const updatedashboard = async() =>{
    setbutton(false)
    try{
     await axios.post("https://semicolon-backend-p6v3.onrender.com/api/v1/user/mark-complete",{
      caregiverName:name,
      bookingDetails:{
        clientName:client.fullName,
        clientEmail:client.email,
        clientAddress:client.address,
        clientPhone:client.phoneNumber,
        paymentId:payid
    }});
     const response = await axios.get("https://semicolon-backend-p6v3.onrender.com/api/v1/user/fetch")
     const bookedcaregiver= response.data.data.find((caregiver)=>caregiver.fullName ===name);
     console.log(bookedcaregiver.completedBookings)
     setbooked(bookedcaregiver.completedBookings)
     toast.success("Service Completed")
     Setnavmodel(false)
     setclientRating(true) 
    }catch(error){
      console.log(error);
      toast.error("api not working")
    }
  }

  const updateclientdashboard = async() =>{
    setbutton1(false)
    try{
     await axios.post("https://semicolon-backend-p6v3.onrender.com/api/v1/user/mark-clientcomplete",{
      clientName:client.fullName,
      bookingDetails:{
        caregiverName:name,
        caregiverEmail:email,
        caregiverImage:image,
         caregiverAadhar:aadhar,
        caregiverPhone:phone,
        paymentId:payid
    }});
     const response = await axios.get("https://semicolon-backend-p6v3.onrender.com/api/v1/user/client/fetch")
     const bookedclient= response.data.data.find((clientd)=>clientd.fullName ===client.fullName);
     console.log(bookedclient.completedBookings)
     setbookedclient(bookedclient.completedBookings)
     toast.success("Service Completed")
     Setclientnavmodel(false)
     setcaregiverRating(true)
    }catch(error){
      console.log(error);
      toast.error("api not working")
    }
  }

  const handlerating = async() =>{
    if(clientrating){
      await axios.post("https://semicolon-backend-p6v3.onrender.com/api/v1/user/clientrating",{
        clientName:client.fullName,
        ratingreview:{
          Rating:rating,
          Review:review
        }
      })
      toast.success("Client rated Successfully")
      setRating(0);
      setReview("")
      setclientRating(false);
    }
    else if(caregiverrating){
       await axios.post("https://semicolon-backend-p6v3.onrender.com/api/v1/user/caregiverrating",{
        caregiverName:name,
        ratingreview:{
          Rating:rating,
          Review:review
        }
      })
       toast.success("Caregiver rated Successfully")
      setRating(0);
      setReview("")
      setcaregiverRating(false);
    }
  }
  


return (
    <>
      <div className="navbar">
        <Link to="/"><p>Care<span className="logo">Connect</span></p></Link> 
        <ul className="navli remove">
          <Link to="/"><li>Home</li></Link> 
          <a href="#page2"><li>About Us</li></a>
          <a href="#page2service"><li>Services</li></a>
          <a href="#page3"><li>Testimonials</li></a>
          <a href="#contactus"><li>Contact Us</li></a>
        </ul>
        <div className="idphoto">
          <div className='nav-img'>
            <img src="./img6.png" alt="/" />
          </div>
          <select className="obtion" onChange={(e) => {
            if (e.target.value === "logout") {
              handleLogout();
            } else if (e.target.value === "Caregiver Dashboard") {
              Setnavmodel(true);
            }
            else if(e.target.value === "Client Dashboard"){
              Setclientnavmodel(true)
            }
          }}>
            <option>{master ? master.username : "Guest"}</option>
            {master && <option value="logout">Logout</option>}
            {master && <option value="Client Dashboard">Client Dashboard</option>}
            {master && <option value="Caregiver Dashboard">Caregiver Dashboard</option>}
          </select> 
        </div>

        <button className="menu" onClick={handleMenu}><MenuIcon/></button>
      </div>

      <div className={`${menuopen ? 'togglemenu' : 'menuclose'}`}>
        <ul>
          <Link to="/"><li>Home</li></Link>
          <a href="#page2"><li>About Us</li></a>
          <a href="#page2service"><li>Services</li></a>
          <a href="#page3"><li>Testimonials</li></a> 
          <a href="#contactus"><li>Contact Us</li></a>
        </ul>
        <button className="closemenu" onClick={handleMenuClose}><CloseIcon/></button>
      </div>

      {navmodal && (
        <div className="navmodal">
          <span className="cancel" onClick={handleremove}><SquareX/></span>
          <h2 className="caregiverdashboardhead">Caregiver Dashboard</h2>
          <h2 className = "currentbookinghead">Current Booking</h2>
          <div className="currentbooking">
            <div className="clientdetails">
                   <span className = "details">Client Name: {client.fullName}</span> 
                   <span className = "details">Client Email: {client.email}</span>
                   <span className = "details">Client Address: {client.address}</span>
                   <span className = "details">Client phone no.:{client.phoneNumber}</span>
                   <span className = "details">Payment ID: {payid}</span>
                   <button className ={button?"completed":"notcompleted"} onClick={updatedashboard}>{button?"Completed":"Not Completed"}</button>
                   </div>

          </div>
           <h2 className = "currentbookinghead">Previous Bookings</h2>
           {booked.length>0 && booked.map((book)=>{
            return(
             <div className="currentbooking">
               <div className="clientdetails">
                    <span className = "details">Client Name: {book.clientName}</span> 
                   <span className = "details">Client Email: {book.clientEmail}</span>
                   <span className = "details">Client Address: {book.clientAddress}</span>
                   <span className = "details">Client phone no.:{book.clientPhone}</span>
                   <span className = "details">Payment ID: {book.paymentId}</span>
                </div>
              </div>
           )})}
    
        </div>
      )}

 {clientnavmodal  && (
  <div className="navmodal">
    <span className="cancel" onClick={handleremove}><SquareX/></span>
    <h2 className="caregiverdashboardhead">Client Dashboard</h2>
    <h2 className = "currentbookinghead">Current Booking</h2>
    <div className="currentbooking">
      <div className="clientdetails">
                   <span className = "details">Caregiver Name: {name}</span> 
                   <span className = "details">Caregiver Email: {email}</span>
                   <span className = "details">Caregiver Image: {image}</span>
                    <span className = "details">Caregiver Aadhar: {aadhar}</span>
                   <span className = "details">Caregiver phone no.:{phone}</span>
                   <span className = "details">Payment ID: {payid}</span>
                   <button className ={button1?"completed1":"notcompleted1"} onClick={updateclientdashboard} >{button1?"Completed":"Not Completed"}</button>
                   </div>
                   </div>
                      <h2 className = "currentbookinghead">Previous Bookings</h2>
                      {bookedclient.length>0 && bookedclient.map((book)=>{
                        return(
                           <div className="currentbooking">
                               <div className="clientdetails">
                   <span className = "details">Caregiver Name: {book.caregiverName}</span> 
                   <span className = "details">Caregiver Email: {book.caregiverEmail}</span>
                   <span className = "details">Caregiver Image: {book.caregiverImage}</span>
                    <span className = "details">Caregiver Aadhar: {book.caregiverAadhar}</span>
                   <span className = "details">Caregiver phone no.:{book.caregiverPhone}</span>
                   <span className = "details">Payment ID: {book.paymentId}</span>
                   </div>
                   </div>
                        )
                      })}

          

          </div>
      )}

      {(clientrating || caregiverrating) && (
        <div className="rating">
           <span className="cancel" onClick={handleremove}><SquareX/></span>
           <h2 className="ratinghead">Rate Your {clientrating?"Client":"Caregiver"}</h2>
           <div className="star">
            {[1,2,3,4,5].map((star)=>{
              return(
                <Star key={star}
                size={30}
                fill={(hovered || rating) >= star ? 'blue' : 'none'}
                onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(star)}
            />
              )
            })}
           </div>
           <div className = "review">
            <textarea  rows="4"
            cols="50"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}/>
           </div>
           <button className="ratingsubmit" onClick={handlerating}>Submit</button>
        </div>
      )}
    </>
  );
}
