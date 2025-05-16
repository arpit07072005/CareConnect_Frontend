import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

export default function Page2({master,handlecaregiver}) {
  
  const navigate= useNavigate();
  const fetchcaregiver = async()=>{
      try{
          const response = await axios.get(`https://semicolon-backend-p6v3.onrender.com/api/v1/caregiver/fetch`);
     // console.log(response.data);
         
          handlecaregiver(response);
          navigate("/Caregivers")
      }catch(error){
          console.log("error in fetching details");
      }
  }
  return (
    <div className="page2" >
    <div className="caregiver" id="page2">
      <span className="head">Become a Caregiver</span>
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
    <button className="app2"  onClick={() =>
            master && Object.keys(master).length > 0
              ? fetchcaregiver()
              : navigate('/Login')
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
  )
}
