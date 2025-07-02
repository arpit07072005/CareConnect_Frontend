
import axios, { Axios } from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Tesseract from 'tesseract.js';


export default function Registration() {
  const [otp, setOtp] = useState("");
const [showOTPInput, setShowOTPInput] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
  
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState("");
const [careGiverImage, setCareGiverImage] = useState();
const [aadharImage, setAadharImage] = useState();
const [fieldOfExpertise, setFieldOfExpertise] = useState("");
const [yearsOfExpertise, setYearsOfExpertise] = useState("");
const [preferredWorkSchedule, setPreferredWorkSchedule] = useState([]);
const [drivingLicence, setDrivingLicence] = useState("");
  const[name,setName]=useState("")
  const[number,setNumber]=useState("")
  const[email,setEmail]=useState("")
  const[address,setAddress]=useState("")
  const[qualification,setQualification]=useState("")
  const[language,setLanguage]=useState("") 
  const[mail,setmail]=useState("")


  const validname = /^[a-zA-Z]+( [a-zA-Z]+){1,}$/;
    const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validcontactno =/[0-9]{10}/;
    const validaddress = /^[a-z0-9A-Z\.\, ]{10,}$/;
const validlanguage = /^[a-zA-Z\.\, ]{4,}$/;
    
  const synonym=["Caregiver","Change","Hope"]
  const handlechange = (e) => {
    const { className, value, checked } = e.target;
  
    switch (className) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "qualify":
        setQualification(value);
        break;
      case "language":
        setLanguage(value);
        break;
      case "date":
        setDateOfBirth(value);
        break;
      case "expertise":
        setFieldOfExpertise(value);
        break;
      case "years":
        setYearsOfExpertise(value);
        break;
      case "schedule":
        if (checked) {
          setPreferredWorkSchedule((prev) => [...prev, value]);
        } else {
          setPreferredWorkSchedule((prev) => prev.filter((item) => item !== value));
        }
        break;
      case "dl":
        setDrivingLicence(value);
        break;
      default:
        break;
    }
  };

const validateAadharOCR = async () => {
  if (!aadharImage) {
    toast.error("Please upload Aadhaar image");
    return false;
  }
  try {
    const { data: { text } } = await Tesseract.recognize(aadharImage, 'eng+hin');

    const extractedText = text.toUpperCase();
    const uidPattern = /\b\d{4}\s\d{4}\s\d{4}\b/;
    
    const isNamePresent = extractedText.includes(name.toUpperCase());
    const isUIDPresent = uidPattern.test(extractedText);
    const isNumberPresent = extractedText.includes(number);
    if (isNamePresent || (isUIDPresent || isNumberPresent)) {
      toast.success("Aadhaar matched successfully");
      return true;
    } else {
      toast.error(" Aadhaar info does not match with the form");
      return false;
    }
  } catch (error) {
    console.error("OCR Error:", error);
    toast.error(" Failed to read Aadhaar image");
    return false;
  }


};

 const generateotp = async () => {
  try {
     await axios.post(
      `https://semicolon-backend-p6v3.onrender.com/api/v1/user/otp/send`,
      { email: email }
    );
    toast.success("OTP sent to your number");
    setShowOTPInput(true); // 👈 show OTP input
  } catch (error) {
    console.error("OTP send failed:", error);
    toast.error("Failed to send OTP");
  }
};
const verifyOtp = async () => {
  try {
     await axios.post(
      `https://semicolon-backend-p6v3.onrender.com/api/v1/user/otp/verify`,
      { email: mail, code: otp }
    );
    toast.success("OTP verified successfully");
    setOtpVerified(true);
      if(otpVerified===true){
        navigate("/");
       }
     toast.success("Registration Successfull");
     
       
  } catch (error) {
    console.error("OTP verification failed", error);
    toast.error("Invalid or expired OTP");
    // setOtpVerified(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAadharValid = await validateAadharOCR();

    generateotp();
   
  if (!isAadharValid) return;

 
    const formData = new FormData();
    formData.append("fullName", name);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("mobileNumber", number);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("fieldOfExpertise", fieldOfExpertise);
    formData.append("yearsOfExpertise", yearsOfExpertise);
    formData.append("qualifications", qualification);
    formData.append("languageSpoken", language);
    formData.append("drivingLicence", drivingLicence === "Yes" ? "true" : "false");

  
    // Preferred schedule - append all selected values
    preferredWorkSchedule.forEach((item) =>
      formData.append("preferredWorkSchedule", item)
    );
  
    // File uploads
    formData.append("image", careGiverImage);
    formData.append("aadharDetail", aadharImage);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    try {
      const response = await axios.post(
        `https://semicolon-backend-p6v3.onrender.com/api/v1/user/register`,
        formData)
       
    } catch (error) {
      console.error("register", error.response?.data || error.message);
      toast.error("register", error.response?.data || error.message)
    }
    if((!validname.test(name)) && name){
      alert("Invalid name ,Enter full name");
      return;
    } 
    if(!name){
      alert("Please enter full name");
      return;
    }
    if((!validcontactno.test(number)) && number){
      alert("Invalid number ,Enter 10 disit valid number");
      return;
    }
    if(!number){
      alert("Please enter contact number");
      return;  
    }
    if((!validemail.test(email)) && email){
      alert("Invalid email format.");
      return;
    }
    if(!email){
      alert("Please enter email");
      return;  
    }
    if((!validaddress.test(address)) && address){
      alert("address must have atleast 10 characters and valid");
      return;
    }
    if(!address){
      alert("Please enter address");
      return;  
    }
    if((!validaddress.test(qualification)) && qualification){
      alert("qualification must have atleast 10 characters and valid");
      return;
    }  
    if(!qualification){
      alert("Please enter qualification");
      return;  
    }
    if((!validlanguage.test(language)) && language){
      alert("enter valid language");
      return;
    }
    if(!language){
      alert("Please enter language");
      return;  
    }
    
  };

  const handlevalidname=()=>{
    if((!validname.test(name)) && name){
      alert("Invalid name ,Enter full name");
      return;
    } 
  }
  const handlevalidcontactno = ()=>{
    if((!validcontactno.test(number)) && number){
      alert("Invalid number ,Enter 10 disit valid number");
      return;
    }  
  }
  const handlevalidemail=()=>{
    if((!validemail.test(email)) && email){
      alert("Invalid email format.");
      return;
    }
  }
  const handlevalidaddress=()=>{
    if((!validaddress.test(address)) && address){
      alert("address must have atleast 10 characters and valid");
      return;
    }
  }
  const handlevalidlanguage=()=>{
    if((!validlanguage.test(language)) && language){
      alert("enter valid language");
      return;
    } 
  }
  const handlevalidqualification = ()=>{
    if((!validaddress.test(qualification)) && qualification){
      alert("qualification must have atleast 10 characters and valid");
      return;
    }  
  }
  return (
    <>
    <div className="registrationform">
      <div className="careimage">
        <div className="careimagetext">
          <span className="bethe">Be The </span>
            <div className="allthree">
            {synonym.map((element)=>{
              return(
                <span>{element}</span>
              )
            })}
            </div>
          
        </div>
      </div>
      <div className="formimage">
        <form onSubmit={handleSubmit} className="rform">
          <h1><span>Caregivers</span>  Registration  Form</h1>
          <input type="text" value={name} className="name" placeholder="Full Name" onChange={handlechange} onBlur={handlevalidname}/>
          <input type="date"  className="date"  placeholder="Date of Birth" onChange={handlechange} value={dateOfBirth} />
          <input type="text" value={number} className="number" placeholder="Contact Number" onChange={handlechange} onBlur={handlevalidcontactno}/>
          <input type="text" value={email} className="email" placeholder="Email Address" onChange={handlechange} onBlur={handlevalidemail}/>
          <span className="image">
          <label for="image">Upload Image</label>
          <input type="file"  className="image"  accept="image/*" onChange={(e)=>{setCareGiverImage(e.target.files[0])}} />
          </span>
          <input type="text" value={address} className="address" placeholder="Residential Address" onChange={handlechange} onBlur={handlevalidaddress}/>
          <span className="aadhar">
          <label for="aadhar">Upload Aadhar</label>
          <input type="file"  accept="image/*" placeholder="Upload Aadhar" onChange={(e)=>{setAadharImage(e.target.files[0])}}/>
          </span>
          <span className="expertise">
            <label for="expertise">Field of Expertise</label>
          <select className="expertise" onChange={handlechange} value={fieldOfExpertise}>
            <option >Field of Expertise</option>
            <option>Elderly Care</option>
            <option>Child Care</option>
            <option>Special Needs Care</option>
            <option>Nursing</option>
            <option>Other</option>

          </select>
          </span>
          <select className="years" onChange={handlechange} value={yearsOfExpertise}>
            <option>Year of Expertise</option>
            <option >Less than 1 year</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>
          <span className="qualification">
          <label for="aadhar">Relevant Qualifications</label>
          <input type="text" value={qualification} className="qualify" placeholder="Qualifications" onChange={handlechange} onBlur={handlevalidqualification}/>
          </span>
          <span class="form-group">
                <label for="schedule" className="schedul">Preferred Work Schedule</label>
                <div class="checkbox-group">
                    <label><input type="checkbox" className="schedule" value="full-time" onChange={handlechange}/> Full-Time</label>
                    <label><input type="checkbox" className="schedule" value="part-time" onChange={handlechange}/> Part-Time</label>
                    <label><input type="checkbox" className="schedule" value="flexible" onChange={handlechange}/> Flexible Hours</label>
                    <label><input type="checkbox" className="schedule" value="weekends" onChange={handlechange}/> Weekends Only</label>
                </div>
            </span>
            <input type="text" value={language} className="language" placeholder="Language Spoken" onChange={handlechange} onBlur={handlevalidlanguage}/>
            <span className="dl">
          <label for="dl">Do you have a valid Driving License ?</label>
          <select    className="dl" onChange={handlechange} value={drivingLicence}>
            <option>---</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          </span>
          <button className="submit">Submit</button>
        </form>
      </div>
    </div>
    {showOTPInput && (
  <div className="otp-section">
    <input
      type="text"
      placeholder="Enter gmail"
      value={mail}
      onChange={(e) => setmail(e.target.value)}
    />
    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />

    <button type="button" onClick={verifyOtp}>
      Verify OTP
    </button>
  </div>
)}

    </>
  )
}
