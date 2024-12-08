'use client'
import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import AuthContext from "../context/AuthProvider.tsx";
import useLogout from "../hooks/useLogout.ts";

import cloudBackground from '../assets/backgrounds/clouds-bg.png'; //Cloud Background

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/customer/register/"
const LOGIN_URL = "/auth/login/"

export default function AccountPage() {
  const logout = useLogout();
  const {auth, setAuth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration form state
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState(false);

  // Validation state
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  // Tips visibility
  const [showUsernameTip, setShowUsernameTip] = useState(false);
  const [showPasswordTip, setShowPasswordTip] = useState(false);
  const [showEmailTip, setShowEmailTip] = useState(false);

  // Show/hide password toggle for signup password
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    if (auth?.accessToken) {
      setIsAuthenticated(true);
    }
  }, [auth]);

  // Validation logic
  useEffect(() => {
    setValidName(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(signupPassword));
    setValidMatch(signupPassword === confirmPassword);
  }, [signupPassword, confirmPassword]);

  useEffect(() => {
    setRegisterError('');
  }, [username, signupEmail, signupPassword, confirmPassword]);

  // Username requirements
  const usernameRequirements = [
    {
      text: "Must start with a letter",
      isMet: username ? /^[A-Za-z]/.test(username) : false
    },
    {
      text: "Must be 4-24 characters",
      isMet: username ? username.length >= 4 && username.length <= 24 : false
    },
    {
      text: "Only letters, numbers, underscores, and hyphens allowed",
      isMet: username ? /^[A-Za-z][A-Za-z0-9-_]{3,23}$/.test(username) : false
    }
  ];

  // Password requirements
  const passwordRequirements = [
    {
      text: "8-24 characters",
      isMet: signupPassword ? signupPassword.length >= 8 && signupPassword.length <= 24 : false
    },
    {
      text: "At least one lowercase letter",
      isMet: signupPassword ? /[a-z]/.test(signupPassword) : false
    },
    {
      text: "At least one uppercase letter",
      isMet: signupPassword ? /[A-Z]/.test(signupPassword) : false
    },
    {
      text: "At least one digit",
      isMet: signupPassword ? /[0-9]/.test(signupPassword) : false
    },
    {
      text: "At least one special character (!@#$%)",
      isMet: signupPassword ? /[!@#$%]/.test(signupPassword) : false
    }
  ];

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        { username: loginUsername, password: loginPassword},
          {
            headers: { 'content-type': 'application/json'},
            withCredentials: true
          },
      );
      
      const accessToken = response?.data?.access;
      const decodedAccessToken = jwtDecode(accessToken);
      const user = decodedAccessToken.username
      const role = decodedAccessToken.role

      setAuth({accessToken, user, role});

      setLoginUsername('');
      setLoginPassword('');
      setIsAuthenticated(true);

    } catch (err: any) {
      console.log(err)
      if (!err?.response) {
        setLoginError('No Server Response');
      } else if (err.response?.status === 400) {
        setLoginError('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setLoginError('Incorrect Username or Password');
      } else {
        setLoginError('Login Failed');
      }
    }
  };

  // Handle registration form submission
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validName || !validPwd || !validMatch) {
      setRegisterError('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,{
        user: {
          username: username,
          email: signupEmail,
          password: signupPassword
        },
        preferences: null
      },{
        headers: { 'content-type': 'application/json'},
        withCredentials: true
      });
        
      console.log('Registration successful:', response.data);
      setSuccess(true);
      setUsername('');
      setSignupEmail('');
      setSignupPassword(''); 
      setConfirmPassword('');
      
      // Automatically switch to login tab after successful registration
      setTimeout(() => {
        setActiveTab('login');
      }, 2000);
      
    } catch (err: any) {
      if (!err?.response) {
        setRegisterError('No Server Response');
      } else if (err.response?.status === 409) {
        setRegisterError('Username or Email Already Exists');
      } else {
        setRegisterError('Registration Failed');
      }
    }
  };

  const signOut = async () => {
    await logout();
    setIsAuthenticated(false);
  }

  // If authenticated, show the authenticated view
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Welcome, {auth?.user || 'User'}!</h2>
          <p className="mb-4">You are now logged in.</p>
          <button
            onClick={signOut}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // If not authenticated, show the login/signup form
  return (
    <>
      <div className="bg-fixed bg-cover bg-center bg-no-repeat min-h-screen w-full"
          style={{
          backgroundImage: `url(${cloudBackground})`
      }}>
        <div className="relative min-h-screen w-full">
          <div className="container mx-auto p-4">
              <div className="min-h-screen relative overflow-hidden">
                <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                  <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
                    <div className="flex space-x-2 mb-8">
                      <button
                        className={`flex-1 py-2 px-4 text-center rounded-md transition-colors ${activeTab === 'login' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('login')}
                      >
                        Login
                      </button>
                      <button
                        className={`flex-1 py-2 px-4 text-center rounded-md transition-colors ${activeTab === 'signup' ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setActiveTab('signup')}
                      >
                        Sign Up
                      </button>
                    </div>

                    {activeTab === 'login' && (
                      <div className="space-y-6">
                        <div className="space-y-2 text-center">
                          <h2 className="text-3xl font-bold text-black">Welcome Back!</h2>
                          <p className="text-gray-600">Login to access your account</p>
                        </div>
                        <form className="space-y-4" onSubmit={handleLoginSubmit}>
                          <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                              id="username"
                              name="username"
                              type="username"
                              value={loginUsername}
                              onChange={(e) => setLoginUsername(e.target.value)}
                              required
                              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                              placeholder="Enter your username"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              required
                              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                            />
                          </div>
                          {loginError && <p className="text-red-500">{loginError}</p>}
                          <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            Login
                          </button>
                        </form>
                      </div>
                    )}

                    {activeTab === 'signup' && (
                      <div className="space-y-6">
                        <div className="space-y-2 text-center">
                          <h2 className="text-3xl font-bold text-black">Create Account</h2>
                          <p className="text-gray-600">Sign up to start planning your trip</p>
                        </div>
                        <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              onFocus={() => setShowUsernameTip(true)}
                              onBlur={() => setShowUsernameTip(false)}
                              required
                              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                              placeholder="JohnDoe123"
                            />
                            {showUsernameTip && (
                              <div className="text-gray-500 text-xs">
                                <p>Username requirements:</p>
                                <ul className="list-disc list-inside">
                                  {usernameRequirements.map((req, index) => (
                                    <li key={index} className={req.isMet ? 'text-green-600' : 'text-red-600'}>
                                      {req.isMet ? 'Fulfilled: ' : 'Not Fulfilled: '} {req.text}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                              id="signup-email"
                              name="email"
                              type="email"
                              value={signupEmail}
                              onChange={(e) => setSignupEmail(e.target.value)}
                              onFocus={() => setShowEmailTip(true)}
                              onBlur={() => setShowEmailTip(false)}
                              required
                              className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                              placeholder="hello@example.com"
                            />
                            {showEmailTip && (
                              <p className="text-gray-500 text-xs">
                                Enter a valid email address (johndoe@example.com).
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                              <input
                                id="signup-password"
                                name="password"
                                type={showSignupPassword ? "text" : "password"}
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                onFocus={() => setShowPasswordTip(true)}
                                onBlur={() => setShowPasswordTip(false)}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                                onClick={() => setShowSignupPassword(!showSignupPassword)}
                              >
                                {showSignupPassword ? 'Hide' : 'Show'}
                              </button>
                            </div>
                            {showPasswordTip && (
                              <div className="text-gray-500 text-xs">
                                <p>Password requirements:</p>
                                <ul className="list-disc list-inside">
                                  {passwordRequirements.map((req, index) => (
                                    <li key={index} className={req.isMet ? 'text-green-600' : 'text-red-600'}>
                                      {req.isMet ? 'Fulfilled: ' : 'Not Fulfilled: '} {req.text}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                              <input
                                id="confirm-password"
                                name="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                              />
                              <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                              </button>
                            </div>
                          </div>
                          {registerError && <p className="text-red-500">{registerError}</p>}
                          <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            Create Account
                          </button>
                          {success && <p className="text-green-500">Registration successful! You can now log in.</p>}
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
