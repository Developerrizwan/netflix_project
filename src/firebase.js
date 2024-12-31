import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCId00VTVDu9A4bBO5Vwpnc7HScUzOiSAY",
  authDomain: "netflix-clone-3a437.firebaseapp.com",
  projectId: "netflix-clone-3a437",
  storageBucket: "netflix-clone-3a437.firebasestorage.app",
  messagingSenderId: "1039548952750",
  appId: "1:1039548952750:web:307eff8334e0d920f7fd3f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


//User SignUp function ///

const signup = async (name, email, password) => {
    try {
        // const res = Here we will get created users details //
        const res = await createUserWithEmailAndPassword(auth,email,
        password);
        const user = res.user //To find users details from the created user in (res) //

        //Store the user in the firestore database //
        await addDoc (collection(db, "user"), {
          uid: user.uid,   //Defining Dtas which need top store in the user collection //
          name,
          authProvider: "local",
          email

        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

