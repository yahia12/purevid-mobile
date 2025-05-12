import { initializeApp } from "firebase/app";

// Only import analytics if you're running on web
// For React Native (Expo), analytics is not needed and will cause errors

const firebaseConfig = {
  apiKey: "AIzaSyDwlu8FYkrQlgk_CAsTHL2akwr-1tYLP-I",
  authDomain: "purefeed-app.firebaseapp.com",
  projectId: "purefeed-app",
  storageBucket: "purefeed-app.firebasestorage.app",   // <-- leave as is for now
  messagingSenderId: "473871113614",
  appId: "1:473871113614:web:6ec63a81b6ef8f1005d8df",
  measurementId: "G-YZ7759Z1LP"
};

export const app = initializeApp(firebaseConfig);
