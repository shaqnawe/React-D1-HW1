import React, { useState, useRef, useContext } from "react";
import { useAuth } from "../contexts/AuthProvider";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AuthForm from "../components/Auth/AuthForm";

const Login = () => {
  
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const db = getFirestore();
  const { signup } = useAuth;
  let auth = getAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  
  const submitHandler = ( e ) => {
    alert('Running!')
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      console.log(emailRef.current.value);
      console.log(passwordRef.current.value);
      setError('')
      setLoading(true)
      // signup(emailRef.current.value, passwordRef.current.value);
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <AuthForm />
  );
};

export default Login;
