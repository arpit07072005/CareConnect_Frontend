import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate  } from 'react-router-dom'; 
import { toast } from 'react-toastify'
import  { SquareX } from "lucide-react";
import axios from 'axios';

export default function Navbar({ master , setmaster , pass , client , payid}) {
  const [menuopen, setMenuopen] = useState(false);
  const [bcare, setBcare] = useState(false);
  const[navmodal,Setnavmodel]=useState(false)
  const[clientnavmodal,Setclientnavmodel]=useState(false)
  const navigate = useNavigate();
  const[button,setbutton]=useState(true)

  const { phone, name, experience, image, field, dob, email, education, lang, aadhar ,bookingdetails, completedBookings = []  } = pass;
  


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
  };

  const updatedashboard = async() =>{
    setbutton(false)
    if(!button){
    try{
     await axios.post("https://semicolon-backend-p6v3.onrender.com/api/v1/user/mark-complete",{
      caregiverName:name,
      bookingDetails:{
        clientName:client.fullName,
        clientEmail:client.email,
        clientAddress:client.address,
        clientPhone:client.phoneNumber,
        paymentId:payid
      }
     });
     toast.success("Booking Completed")
    }catch(error){
      console.log(error);
      toast.error("api not working")
    }
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
            else{
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
           {completedBookings.length > 0 && completedBookings.map((book, index) => (
           <div className="currentbooking" key={index}>
            <div className="clientdetails">
      <span className="details">Client Name: {book[0].clientName}</span>
      <span className="details">Client Email: {book.clientEmail}</span>
      <span className="details">Client Address: {book.clientAddress}</span>
      <span className="details">Client phone no.: {book.clientPhone}</span>
      <span className="details">Payment ID: {book.paymentId}</span>
    </div>
  </div>
))}
        </div>
      )}
    </>
  );
}
