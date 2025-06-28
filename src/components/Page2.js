import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Page2({master,handlecaregiver,handlesignedclient}) {
  const[display,setdisplay]=useState(false)
  const[modal,setModal]=useState(false)
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[signedupclient,setSignedupClient]=useState({})
  const[address,setAddress]=useState("");
    const[service,setService]=useState("");
  const[clientdata,setClientdata]=useState([]);
  
  const navigate= useNavigate();
  const fetchcaregiver = async()=>{
     
      try{
          const response = await axios.get(`https://semicolon-backend-p6v3.onrender.com/api/v1/user/fetch`);
          console.log(response.data);
         
          handlecaregiver(response);
          navigate("/Caregivers")
         
      }catch(error){
          console.log("error in fetching details");
      }
  }

  const handleClient = async(e) =>{
    if(display===false){
    try{
    const response = await axios.get("https://semicolon-backend-p6v3.onrender.com/api/v1/user/client/fetch");
   
    const registeredclient = response.data.data.find((client)=>client.email===email)
     
    if(registeredclient){
      setSignedupClient(registeredclient)
      handlesignedclient(registeredclient)
     
      fetchcaregiver();
        navigate("/Caregivers")
       setModal(false)
      toast.success("Client Signed up Successfully 🎉");
}
else{
  setName("");
  setEmail("");
  setPhone("");
  setdisplay(true)
  toast.error("Client Not Registered");
}
    }catch(error){
      console.log("client not registered");
    }
  }
  else{
    try{
       if (
      !name || !email || !phone || !address || !service
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }
      const formData = {
        fullName:name,
        email:email,
        phoneNumber:phone,
        service:service,
        address:address,
      };
      setClientdata((prev) => [...prev, formData]);
      console.log(formData)
       await axios.post(`https://semicolon-backend-p6v3.onrender.com/api/v1/user/client`,
        formData
      );
      setdisplay(false)
      toast.success("Form submitted successfully! 🎉")
      setName("");
      setEmail("");
      setPhone("");
    }catch(error){
      console.log("error in registering client");
    }
  }

      
  }

  useEffect(() => {
  if (signedupclient && Object.keys(signedupclient).length > 0) {
    console.log("Client found ✅", signedupclient);
  }
}, [signedupclient]);


  return (
    <>
    <div className="page2" >
    <div className="caregiver" id="page2">
      <span className="head">Became a Caregiver</span>
      <p>Join our platform and make a difference in someoen's life.</p>
      <ul className="caregiverli">
        <li>Comprehensive Credential Collection</li>
        <li>Professional Background Verification</li>
        <li>Fraud Prevention Measures </li>
      </ul>
      <Link to={master && Object.keys(master).length > 0 ? "/Registration" : "/Login"}>
  <button className="app1">Start</button>
</Link>


    </div>
    <div className="client">
    <span className="head">Find the Right Caregiver</span>
      <p>Browse our curated pool of caregivers to find the perfect match.</p>
      <ul className="caregiverli">
        <li>Customize your Services</li>
        <li>Negotiate Terms</li>
        <li>Flexible Engagements</li>
      </ul>
    <button className="app2"  onClick={() =>{
      if(master && Object.keys(master).length > 0){
        setModal(true);
        console.log(true)
      }
      else if(!master){
        navigate('/Login');
      }

    }
          
    }>Browse</button>

    </div>
    <div className="services" id="page2service">
    <span className="head">Our Services</span>
    <p>Full-Time Caretaking Assistance</p>
    <p>Round-the-clock, 24/7 care tailored to the clients's needs.</p>
    <span className="heada">Medical and Logistical Assistance</span>
    <p>Transportation to medical facilities and management of paperwork</p>
    </div>
   
  </div>

   {modal && (
      <div className="modal">
        <div className="inner-modal">
          <div className="modellogo">
            <img src="./model.png"  alt="" height="80px"/>
          </div>
          <span className="modelhead">Register as a Client</span>
          <form >
            <input type="text" className="modalinput" value={name} placeholder='Full Name'  onChange={(e) => setName(e.target.value)}/>
            <input type="text" className="modalinput" value={email} placeholder='Email Address'  onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" className="modalinput" value={phone} placeholder='Phone Number '  onChange={(e) => setPhone(e.target.value)}/>
            <select value={service} className={display===false?"nomodalinput":"modalinput"} placeholder="Services Required"  onChange={(e) => setService(e.target.value)}>
              <option>Elderly Care</option> 
              <option>Child Care</option> 
              <option>Nursing</option> 
              <option>Special Needs Care</option> 
              <option> Other</option> 
            </select>
              <input type="text" className={display===false?"nomodalinput":"modalinput"} value={address} placeholder='Address'  onChange={(e) => setAddress(e.target.value)}/>
          </form>
        <button onClick={handleClient} className="modalsubmit">{display===false?"Client Sign in":"Client Register"}</button>
        </div>

      </div>
  )}
  
  

  </>
  )
}

 
     
     
    //    fetchcaregiver();
    //   setModal(false)
      
    //   ;


