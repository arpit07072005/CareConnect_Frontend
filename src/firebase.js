import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACmsc2F0ZIRoXdvcmUAzLM_E93muR-yAQ",
  authDomain: "myproject-a341b.firebaseapp.com",
  projectId: "myproject-a341b",
  storageBucket: "myproject-a341b.appspot.com",
  messagingSenderId: "500151086792",
  appId: "1:500151086792:web:5f5afd0af97eabce21fffd",
  measurementId: "G-VHZ8FCGGY5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier };
