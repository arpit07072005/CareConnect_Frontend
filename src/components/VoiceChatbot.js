import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceChatbot = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    setTranscript(text);
    handleCommand(text.toLowerCase());
  };

  recognition.onerror = (event) => {
    alert("Error in speech recognition: " + event.error);
  };

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  // Step 4: Improved keyword matching
  const handleCommand = (text) => {
    const routes = {
    signup: [ 'new','naya', 'what i do'],
      Login: ['aa gaye', 'login ','old'],
      Registration: ['caregiver', 'helper', 'job'],
    };
    for (const route in routes) {
      for (const keyword of routes[route]) {
        if (text.includes(keyword)) {
           
          navigate('/' + route);
            
          return;
            
        }
      }
    }
    alert("Sorry, I didn't understand. Try saying new, login, or job.");
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={listening ? stopListening : startListening}>
        {listening ? 'Stop Listening' : 'Start Talking'}
      </button>
      <p><b>You said:</b> {transcript}</p>
      <p>Try saying: new, login, or job</p>
    </div>
  );
};

export default VoiceChatbot;
