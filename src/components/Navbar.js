import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';

export default function Navbar({ master , setmaster}) {
  const [menuopen, setMenuopen] = useState(false);
  const [bcare, setBcare] = useState(false);
  const navigate = useNavigate();


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

  const handleBecomeCaregiver = () => {
    setBcare(true);
    alert("Redirecting to Become Caregiver Page...");
    navigate("/Registration"); 
  };

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
            } else if (e.target.value === "become-caregiver") {
              handleBecomeCaregiver();
            }
          }}>
            <option>{master ? master.username : "Guest"}</option>
            {master && <option value="logout">Logout</option>}
            {master && <option value="browse-caregiver">Browse Caregiver</option>}
            {master && <option value="become-caregiver">Become Caregiver</option>}
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
    </>
  );
}
