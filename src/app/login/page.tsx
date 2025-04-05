"use client";

import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate a successful login
    setUser({ username, id: Date.now().toString() });
    localStorage.setItem('user', JSON.stringify({ username, id: Date.now().toString() }));
  };

  if (user) {
    // If already logged in, show a different screen
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="text-xl font-bold text-blue-600">
                    Tamagotchi Life Coach
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Welcome back, {user.username}!</h1>
            <p className="mb-4">You are already logged in.</p>
            <a href="/dashboard" className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-center transition-colors">
              Go to Dashboard
            </a>
          </div>
        </main>
        <footer className="bg-white mt-12 py-6 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; 2025 Tamagotchi Life Coach. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-xl font-bold text-blue-600">
                  Tamagotchi Life Coach
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">{isRegistering ? 'Create Account' : 'Login'}</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="******************"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isRegistering ? 'Register' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                {isRegistering ? 'Already have an account?' : 'Need an account?'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 border-t pt-4">
            <p className="text-center text-gray-500 text-xs">
              &copy; 2025 Tamagotchi Life Coach. All rights reserved.
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 Tamagotchi Life Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
