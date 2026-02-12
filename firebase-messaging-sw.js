
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDV9D-f4SltDrOZwLxU0mY2DOdt8Q8RYvM",
  authDomain: "samisaeed-8ec18.firebaseapp.com",
  projectId: "samisaeed-8ec18",
  storageBucket: "samisaeed-8ec18.firebasestorage.app",
  messagingSenderId: "530392010038",
  appId: "1:530392010038:web:77fc81d385cf7a55c03797"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico' // Or use your logoUrl
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
