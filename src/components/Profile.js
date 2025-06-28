import axios from 'axios';
import { Check, Heart, IndianRupee, Stethoscope } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Profile = ({ pass , client }) => {
  const [like, Setlikes] = useState(false);
  const [language, setLanguage] = useState([]);
  const [edu, setEdu] = useState([]);
  const [amount, setAmount] = useState(null);
  const[paymentdone,setPaymentdone]=useState(false);

  const { phone, name, experience, image, field, dob, email, education, lang, aadhar } = pass;

  const handleclick = () => {
    Setlikes(!like);
  };

  useEffect(()=>{
   console.log(client.email)
  },[])

  useEffect(() => {
    if (lang) {
      const splitlanguage = lang
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
      setLanguage(splitlanguage);
    }
  }, [lang]);

  useEffect(() => {
    if (education) {
      const splitedu = education
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '');
      setEdu(splitedu);
    }
  }, [education]);

  useEffect(() => {
    let newAmount;
    if (experience === "Less than 1 year") {
      newAmount = Math.floor(Math.random() * (600 - 500 + 1)) + 500;
    } else if (experience === "1-3 years") {
      newAmount = Math.floor(Math.random() * (800 - 700 + 1)) + 700;
    } else if (experience === "3-5 years") {
      newAmount = Math.floor(Math.random() * (1000 - 900 + 1)) + 900;
    } else {
      newAmount = Math.floor(Math.random() * (1100 - 1000 + 1)) + 1000;
    }
    setAmount(newAmount);
  }, [experience]);

  useEffect(()=>{
    const sendcaregivermail = async()=>{
      try{
        await axios.post("https://semicolon-backend-p6v3.onrender.com/api/v1/user/gmail/send/client",{
          gmail:client.email,
          message:client.address
        })
      }catch(error){
        console.log(error);
      }
    }
     if (paymentdone) {
    sendcaregivermail(); // ✅ Call function only when payment is marked done
  }
  },[paymentdone])
  useEffect(() => {
  console.log("Payment Done Updated ✅:", paymentdone);
}, [paymentdone]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlepayment = async() =>{
   let orderId =
   "OD" + Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
   const res = await loadScript(
    "https://checkout.razorpay.com/v1/checkout.js"
   );
   if(!res){
    alert("Razorpay sdk failed to load.Are you online");
    return;
   }
   let paymentres = {
    order_id:orderId,
    amount:1,
    currency:"INR",
    payment_capture:1,
  }
  let result = await axios.post(`https://semicolon-backend-p6v3.onrender.com/api/v1/user/create`,
    paymentres
  );

    if (!result.data.data) {
      alert("Server error");
      return;
    } else {
      let options = {
        key: "rzp_live_D0LI2klGS3xY8S",
        currency: result.data.data.currency,
        amount: result.data.data.amount,
        order_id: result.data.id,
        name: "CareConnect",
        description: "Live Transaction",
        handler: async function (response) {
          const result_1 = await axios.post(`https://semicolon-backend-p6v3.onrender.com/api/v1/user/create`, {
            payment_id: response.razorpay_payment_id,
          });
          console.log("result_1", result_1);

          setPaymentdone(true); 
          console.log(paymentdone);
        },
        prefill: {
          email: "mohammad2311061@akgec.ac.in",
          contact: 6387034769,
        },
        notes: {
          address: "CareConnect Private Limited",
        },
        theme: {
          color: "rgba(97, 174, 185, 1)",
        },
      };

      let paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };

  return (
    <div className="profile">
      <p className="profilehead">Profile</p>
      <div className="both">
        <div className="profileimage">
          <img src={image} height="100%" width="100%" alt="/" />
        </div>
        <div className="profiledetails">
          <div className="previous">
            <div className="heart">
              <span className="username1">{name}</span>
              <div className="likes">
                <Heart onClick={handleclick} fill={like ? "rgba(3, 172, 240, 1)" : "rgba(255, 255, 255, 0.3)"} />
                {amount}
              </div>
            </div>
            <span className="aboutcaregiver">
              I have more than yrs of nanny/housekeeping works and I love children
            </span>
            <div className="caregiverexpertise">
              <Check fill="rgba(3, 172, 240, 1)" color="rgba(3, 172, 240, 1)" />
              <span className="expertise">{field}</span>
            </div>
            <div className="allthreedetails">
              <div className="careexperience">
                <h5>Work Experience</h5>
                <ul>
                  <li>{experience}</li>
                </ul>
              </div>
              <div className="Nationality">
                <h5>Nationality</h5>
                <ul>
                  <li>Indian</li>
                </ul>
              </div>
              <div className="dob">
                <h5>DOB</h5>
                <ul>
                  <li>{dob}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="otherdetails">
            <div className="lang">
              <h5>Language</h5>
              <ul className="lang">
                {language && language.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}
              </ul>
            </div>
            <div className="ed">
              <h5>Education</h5>
              <ul className="lang">
                {edu && edu.map((eduItem, i) => (
                  <li key={i}>{eduItem}</li>
                ))}
              </ul>
            </div>
            <div className="contact">
              <h5>Contact</h5>
              <div className="impdetails">
                <span className="profileemail">Email : {email}</span>
                <span className="profilephone">Phone no : {phone}</span>
              </div>
            </div>
          </div>
          <div className="payment">
            <div className="validid">
              <h5>Vailid Id Proof</h5>
              <div className="aadharimage">
                <img src={aadhar} width="100%" height="100%" alt="/" />
              </div>
            </div>
            <div className="rupay">
              <h5>Payment : <IndianRupee size="16px" />{amount}</h5>
              <button className="razorpay" onClick={handlepayment}>Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
