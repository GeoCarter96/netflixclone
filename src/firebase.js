
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword,
     getAuth, signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBJLVMyDjRyLxxpwhtL4GzgR6GnFFhAbWo",
  authDomain: "netflix-clone-41fd2.firebaseapp.com",
  projectId: "netflix-clone-41fd2",
  storageBucket: "netflix-clone-41fd2.firebasestorage.app",
  messagingSenderId: "945654977366",
  appId: "1:945654977366:web:986dca8fdd1ae7fdfdbcf7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
try{
const res = await createUserWithEmailAndPassword(auth, email, password);
const user = res.user;
await addDoc(collection(db, "user"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
});
}catch(error){
console.log(error);
toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login = async (email, password) => {
try {
    signInWithEmailAndPassword(auth,email,password);
} catch (error) {
    console.log(error);
  toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signup, logout}