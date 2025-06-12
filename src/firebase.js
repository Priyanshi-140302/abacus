import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBd7RFtyESGIllMVfzUxUidS-8p3eruPbk",
    authDomain: "workholics-405809.firebaseapp.com",
    databaseURL: "https://workholics-405809-default-rtdb.firebaseio.com",
    projectId: "workholics-405809",
    storageBucket: "workholics-405809.firebasestorage.app",
    messagingSenderId: "548618143195",
    appId: "1:548618143195:web:edeea0fee26efa99c753fe",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
