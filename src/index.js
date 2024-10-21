import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { requestToken } from './authenthication/firebase'; // Import the function to request the token

// Register the service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker/firebase-messaging-sw.js')
        .then(async (registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
            
            // Now request the token here
            try {
                const token = await requestToken();
                console.log('Firebase Messaging Token:', token);
            } catch (error) {
                console.error('Error fetching FCM token:', error);
            }
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
