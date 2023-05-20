import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    surname: '',
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/buyers/login', loginData);
      // Handle successful login
      console.log(response.data); // Access token and isAdmin

      const { accessToken, isAdmin } = response.data;
      const buyerId = decodeAccessToken(accessToken).id;

      // Redirect to appropriate page based on isAdmin
      if (isAdmin === 1) {
        window.location.href = `/login/buyers/${buyerId}/admin`;
      } else {
        
        window.location.href = `/login/buyers/${buyerId}/home`;
      }
    } catch (error) {
      // Handle login error
      console.error(error.response.data.error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/buyers/auth', registerData);
      // Handle successful registration
      console.log(response.data); // "SUCCESS" or other response data
    } catch (error) {
      // Handle registration error
      console.error(error.response.data.error);
    }
  };

  const decodeAccessToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding access token:', error);
      // Handle decoding error
      return null;
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={registerData.name}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={registerData.surname}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={registerData.email}
          onChange={handleRegisterChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerData.password}
          onChange={handleRegisterChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Login;