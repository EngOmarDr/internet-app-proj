importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
    apiKey: "AIzaSyD4BGjLfI5R1XucdRMMGISl2qw9KgS9_js",
    projectId: "source-safe-4a69e",
    messagingSenderId: "138441265257",
    appId: "1:138441265257:web:9674a577b65deaa49f92f8",
};

firebase.initializeApp(defaultConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});