importScripts("https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAC52OeIPXLtWuGbW60Gh6xO28KoYRM3so",
  authDomain: "cba-pn.firebaseapp.com",
  projectId: "cba-pn",
  storageBucket: "cba-pn.appspot.com",
  messagingSenderId: "742957099949",
  appId: "1:742957099949:web:b529ce56b36d3a560a4f24",
  measurementId: "G-EQD9JDLWZ5",
});

const initMessaging = firebase.messaging();

// Add a notification click event listener
self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Close the notification

  // Handle the click action, e.g., open a specific URL
  event.waitUntil(
    clients.openWindow("http://localhost:3000/") // Replace with your app's URL
  );
});
