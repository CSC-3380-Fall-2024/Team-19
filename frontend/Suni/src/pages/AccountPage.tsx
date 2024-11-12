'use client'

import { useState } from 'react'

export default function Component() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Auth Container */}
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
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input id="email" name="email" type="email" required className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="hello@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input id="password" name="password" type="password" required className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
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
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input id="name" name="name" type="text" required className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input id="signup-email" name="email" type="email" required className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" placeholder="hello@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input id="signup-password" name="password" type="password" required className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input id="confirm-password" name="confirm-password" type="password" required className="text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                  Create Account
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}