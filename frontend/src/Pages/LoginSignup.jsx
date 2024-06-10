import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios'

const LoginSignup = () => {
  const [state,setstate] = useState("Login");
  const [formData, setformData] = useState({
    name:"",
    email:"",
    password:""
  });

  const login = async () => {
    console.log('Login Function Executed', formData);
    
    try {
        const result = await axios.post("http://localhost:4000/login", formData);
        console.log('Login Response:', result.data);

        if (result.data.success) {
          localStorage.setItem('token', result.data.token);
          alert('Login successful');
          window.location.replace("/");
      } else {
        alert(result.data.message);
    }
    } catch (error) {
        alert('login failed');
        console.log(error);
    }
};

  const signup = async () => {
    console.log('Signup Function Executed', formData);

    try {
      const result = await axios.post("http://localhost:4000/signup", formData);
      console.log('Signup Response:', result.data);
      alert('Signup successful');
      // localStorage.setItem('token', result.data.token);
      // window.location.replace("/")
  } catch (error) {
      alert('Signup failed');
      console.log(error);
  }
  };

  const changeHandler = (e) => {
    setformData({...formData, [e.target.name]: e.target.value})
  }
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">

        <h1>{state}</h1>

        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" name='name' value={formData.name} onChange={changeHandler} placeholder='Your Name' />:<></>}

          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder='Email Address' />

          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder='Your Password' />
        </div>

        <button onClick={()=>{state === "Login" ? login():signup()}}>Continue</button>

        {state === "Sign Up" ? 
        <p className="loginsignup-login">Already have an account? <span onClick={()=>{setstate("Login")}}>Login here</span></p> : 
        <p className="loginsignup-login">Create an account? <span onClick={()=>{setstate("Sign Up")}}>Click here</span></p>
        }
        
        <div className="loginsignup-agree">
          <p>By clicking Sign Up, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup