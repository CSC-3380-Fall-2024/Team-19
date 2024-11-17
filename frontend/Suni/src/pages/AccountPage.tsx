'use client'

import { useState, useEffect } from 'react';
import axios from "../api/axios";
import useAuth from '../hooks/useAuth.tsx';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function AccountPage() {
  const { auth, setAuth } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
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

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', 
        JSON.stringify({ email: loginEmail, password: loginPassword }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      
      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      
      setAuth({ user, accessToken });
      setLoginEmail('');
      setLoginPassword('');
      setIsAuthenticated(true);
    } catch (err: any) {
      if (!err?.response) {
        setLoginError('No Server Response');
      } else if (err.response?.status === 400) {
        setLoginError('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setLoginError('Unauthorized');
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
      const response = await axios.post('/auth/register',
        JSON.stringify({
          username,
          email: signupEmail,
          password: signupPassword,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      
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

  const handleLogout = () => {
    setAuth({});
    setIsAuthenticated(false);
  };

  // If authenticated, show the authenticated view
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Welcome, {auth?.user?.username || 'User'}!</h2>
          <p className="mb-4">You are now logged in.</p>
          <button
            onClick={handleLogout}
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
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
          {/* Your existing login/signup form JSX */}
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                    placeholder="hello@example.com"
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
                    required
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                    placeholder="johndoe123"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                    placeholder="hello@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="signup-password"
                    name="password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                {registerError && <p className="text-red-500">{registerError}</p>}
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  disabled={!validName || !validPwd || !validMatch}
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
  );
}