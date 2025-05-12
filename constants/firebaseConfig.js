// constants/firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { EXPO_PUBLIC_FIREBASE_API_KEY } from "@env";

const firebaseConfig = {
  apiKey: EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "purefeed-app.firebaseapp.com",
  projectId: "purefeed-app",
  storageBucket: "purefeed-app.firebasestorage.app",
  messagingSenderId: "473871113614",
  appId: "1:473871113614:web:6ec63a81b6ef8f1005d8df"
};

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
