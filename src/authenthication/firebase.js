// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9H8uB3HfDdwJOV69n37e4jQ4NeVaL9xQ",
  authDomain: "rc-security-challenge.firebaseapp.com",
  projectId: "rc-security-challenge",
  storageBucket: "rc-security-challenge.appspot.com",
  messagingSenderId: "387313462094",
  appId: "1:387313462094:web:66a0fa1182266690908c1f",
  measurementId: "G-8MTDGG2D49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

const requestToken = async (registration) => {
    try {
        const token = await getToken(messaging, {
            vapidKey: 'myVapidKey',
            serviceWorkerRegistration: registration
        });
        console.log('Token:', token);
        return token;
    } catch (error) {
        console.error('Error requesting token:', error);
        throw new Error('Error requesting token');  
    }
};

export { requestToken };