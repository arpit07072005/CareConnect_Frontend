import React, { useState } from 'react'

export default function Page3() {
    const[query,setQuery]=useState();
    const handleChange=(e)=>{
         setQuery(e.target.value)
    }
  return (
    <div className="page3" id="page3">
          <div className="parent1">
          <div className="child1">
            <h1>Why Choose Us?</h1>
            <p> <span className="heading">Integrity</span>: thorough background checks.</p>
            <p><span className="heading">Lucidity</span>: Open communication.</p>
            <p> <span className="heading">Flexibilty</span>: Customized agreements.</p>
            <p><span className="heading">Expertise</span>: Qualified caregivers.</p>
              
          </div>
          <div className="child2">
          <h1>What Our Users Say</h1>
          <p>“This service changed my life!” - Client A</p>
          <p>“I found the perfect caregiver for my mother.” - Client B</p>
          <p>“Such a great platform! It made finding a caretaker for my kids so easy.” - Client C</p>
           </div>
          </div>
          <div className="feedback">
            <span className="policy">
              <p>Privacy Policy</p>
              <p> Terms of Service</p>
              <p> FAQs</p>
            </span>
            <p><span className="email">Email:</span>support@careconnect.com</p>
            <p><span className="email">Phone:</span>6387034789</p>
            <span className="query">Stay Updated with Our Services</span>
           <span className="inpsub"><input type ="text" className="inp" value={query} placeholder="Enter your Email" onChange={handleChange} /><button className="sub">Subscribe</button></span> 


          </div>
          </div>

  )
}
