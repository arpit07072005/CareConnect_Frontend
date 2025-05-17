import React from 'react'

import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Contact from './Contact';
import VoiceChatbot from './VoiceChatbot';
export default function Fullpage({master ,handlecaregiver}) {
   
  return (
   <>
   <Page1/>
   <VoiceChatbot/>
   <Page2 master={master} handlecaregiver={handlecaregiver}/>
   <Page3/>
   <Page4/>
   <Page5/>
   <Contact/>
   </>
  )
}
