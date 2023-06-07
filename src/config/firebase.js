import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
// getting firestore connection
import { getFirestore } from "firebase/firestore";
// getting storage connection
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC57uPMRlMcUmhBG1yO-zXRAWSQ9hFa1FU",
  authDomain: "firemovies-489c8.firebaseapp.com",
  projectId: "firemovies-489c8",
  storageBucket: "firemovies-489c8.appspot.com",
  messagingSenderId: "184700484065",
  appId: "1:184700484065:web:8cb59e971d5bf6f8efbaa0",
  measurementId: "G-PPNLYEVNCF"
};



const app = initializeApp(firebaseConfig);

// authentication
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);