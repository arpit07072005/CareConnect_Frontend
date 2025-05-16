
import './App.css';
import Navbar from './components/Navbar';
// import Page1 from './components/Page1';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Registration from './components/Registration';
import Fullpage from './components/Fullpage';
import Login from './components/Login';
import Signup from './components/Signup';
import { useEffect, useState } from 'react';
import Caregivers from './components/Caregivers';
import Profile from './components/Profile';
import VoiceChatbot from './components/VoiceChatbot';
import Contact from './components/Contact';


function App() {
 
  const[master,setmaster]=useState({})
  const[caregiver,setCaregiver]=useState([])
  const[pass,setPass]=useState({})

  // SIGNUP FUNCTIONALITY
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setmaster(JSON.parse(storedUser));
    }
  }, []);

 
  const handlemaster = (user)=>{
    setmaster(user)
  }

 

const handlecaregiver = (res) => {
  if (Array.isArray(res?.data?.data)) {
    setCaregiver(res.data.data); // ⬅️ just the array
    console.log("Caregiver array set:", res.data.data);
  } else {
    console.error("Expected caregiver to be an array, got:", res);
  }
};

const passprops=(phone,name,experience,image,field,dob,email,education,lang,aadhar)=>{
  setPass(prevPass => ({
    ...prevPass,
    phone,
    name,
    experience,
    image,
    field,
    dob,
    email,
    education,
    lang,
    aadhar
  }));
  
  // console.log(pass.name);
}

useEffect(() => {
  console.log("Updated pass state:", pass);
}, [pass]);
 
 
  // LOGIN FUNCTIONALITY

  

  return (
    <div className="App">
      <Router>
      <Navbar master={master} setmaster={setmaster}/>
      
      <Routes>
      <Route path="/" element={<Fullpage master={master} handlecaregiver={handlecaregiver} />} />
       <Route path="/voicechat" element={<VoiceChatbot />} />
      <Route path="/Registration" element={<Registration/>} />
      <Route path="/Login" element={<Login handlemaster ={handlemaster}/>} />
      <Route path="/signup" element={<Signup />}/>
      <Route path="/Caregivers" element={<Caregivers caregiver={caregiver} passprops={passprops} />}/>
      <Route path="/profile" element={<Profile  pass={pass}/>}/>
    <Route path="/" element={<Signup/>}/>
       </Routes>
       </Router>
       <ToastContainer position="top-center"  autoClose={2000} />

     </div>
  );
}

export default App;
