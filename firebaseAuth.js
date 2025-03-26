// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6KiFkkB8prTSWh3ugHLaTwRQ_rXqfmhQ",
  authDomain: "my-web-87bbd.firebaseapp.com",
  projectId: "my-web-87bbd",
  storageBucket: "my-web-87bbd.appspot.com",
  messagingSenderId: "660880570580",
  appId: "1:660880570580:web:61ca6dc8a98843774aa341"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }

const signUp=document.getElementById('submitSignUp');
   signUp.addEventListener('click', (event)=>{
      event.preventDefault();
      const email=document.getElementById('signup_email').value;
      const password=document.getElementById('signup_password').value;
      const username=document.getElementById('signup_username').value;
  
      const auth=getAuth();
      const db=getFirestore();
  
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential)=>{
          const user=userCredential.user;
          const userData={
              email: email,
              username: username,
              password: password,
          };
          showMessage('Account Created Successfully', 'signUpMessage');
          const docRef=doc(db, "users", user.uid);
          setDoc(docRef,userData)
          .then(()=>{
              window.location.href='index.html';
          })
          .catch((error)=>{
              console.error("error writing document", error);
  
          });
      })
      .catch((error)=>{
          const errorCode=error.code;
          if(errorCode=='auth/email-already-in-use'){
              showMessage('Email Address Already Exists !!!', 'signUpMessage');
          }
          else{
              showMessage('unable to create User', 'signUpMessage');
          }
   });
})

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
event.preventDefault();
const email=document.getElementById('signIn_email').value;
const password=document.getElementById('signIn_password').value;
const auth=getAuth();

signInWithEmailAndPassword(auth, email,password)
.then((userCredential)=>{
    showMessage('login is successful', 'signInMessage');
    const user=userCredential.user;
    localStorage.setItem('loggedInUserId', user.uid);
    window.location.href='s-index.html';
})
.catch((error)=>{
    const errorCode=error.code;
    if(errorCode==='auth/invalid-credential'){
        showMessage('Incorrect Email or Password', 'signInMessage');
    }
    else{
        showMessage('Account does not Exist', 'signInMessage');
    }
})
})
   