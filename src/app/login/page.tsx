"use client";

import React, { useState, useEffect } from 'react'; // Added React import

// Define a simple user type (adjust as needed)
interface User {
  username: string;
  id: string;
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null); // Added type annotation for user state
  const [isClient, setIsClient] = useState(false);

  // Check localStorage only on the client-side
  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        localStorage.removeItem('user'); // Clear invalid data
      }
    }
  }, []);


  // Added type React.FormEvent<HTMLFormElement> to the event parameter 'e'
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, this would make an API call for login or registration
    // For demo purposes, we'll just simulate a successful login/registration
    console.log(isRegistering ? 'Registering:' : 'Logging in:', username);

    // Simulate API response and set user state
    const simulatedUser: User = { username, id: Date.now().toString() };
    setUser(simulatedUser);

    // Save to localStorage only on client
    if (isClient) {
        try {
           localStorage.setItem('user', JSON.stringify(simulatedUser));
        } catch (err) {
           console.error("Failed to save user to localStorage", err);
        }
    }

    // Redirect or update UI after successful login/registration
    // Example: router.push('/dashboard') if using Next.js router
  };

   const handleLogout = () => {
      setUser(null);
      if (isClient) {
         localStorage.removeItem('user');
      }
       // Redirect to login or home page
      // Example: router.push('/login');
   };


  // Render loading or placeholder if not client-side yet to avoid hydration errors
  if (!isClient) {
    return <div>Loading...</div>; // Or some placeholder component
  }


  // If user state is populated (logged in)
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Simplified Header for Logged-in State */}
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
               <div className="flex items-center space-x-4">
                 <span className="text-sm text-gray-700">Welcome, {user.username}!</span>
                 <button
                   onClick={handleLogout}
                   className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                 >
                   Logout
                 </button>
               </div>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Welcome back, {user.username}!</h1>
            <p className="mb-4">You are logged in.</p>
            <a href="/dashboard" className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-center transition-colors">
              Go to Dashboard
            </a>
          </div>
        </main>
        {/* Simplified Footer */}
        <footer className="bg-white mt-12 py-6 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Tamagotchi Life Coach. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Render Login/Register form if user is not logged in
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       {/* Simplified Header for Login State */}
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
               {/* Optionally add a link back home or other minimal nav */}
            </div>
          </div>
        </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center">{isRegistering ? 'Create Account' : 'Login'}</h1>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="******************"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              >
                {isRegistering ? 'Register' : 'Sign In'}
              </button>
              <button
                type="button"
                onClick={() => {setIsRegistering(!isRegistering); setError('');}} // Clear error on toggle
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                {isRegistering ? 'Login instead' : 'Create account'}
              </button>
            </div>
          </form>

        </div>
      </main>
      {/* Simplified Footer */}
       <footer className="bg-white mt-12 py-6 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Tamagotchi Life Coach. All rights reserved.
            </p>
          </div>
        </footer>
    </div>
  );
}