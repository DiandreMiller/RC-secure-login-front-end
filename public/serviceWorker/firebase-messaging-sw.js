/* eslint-disable no-undef */


importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js');

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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message:', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});