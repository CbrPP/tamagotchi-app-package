"use client";

import { useState } from 'react';

export default function BreedingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasTamagotchi, setHasTamagotchi] = useState(false);
  
  // In a real implementation, we would check if user is logged in and has a Tamagotchi
  // For now, we'll just show a placeholder
  
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
              <nav className="ml-6 flex space-x-8">
                <a href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Dashboard
                </a>
                <a href="/care" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Care
                </a>
                <a href="/evolution" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Evolution
                </a>
                <a href="/lifestyle" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Lifestyle
                </a>
                <a href="/ai" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  AI Chat
                </a>
                <a href="/breeding" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
                  Breeding
                </a>
                <a href="/marketplace" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Marketplace
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <a href="/login" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">Breeding System</h1>
              
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                  ❤️
                </div>
                <h2 className="text-xl font-semibold mb-2">Breeding System</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Breed your Tamagotchi with others to create unique offspring with inherited traits.
                  Rarer parents have a higher chance of producing rare offspring.
                </p>
                
                <div className="bg-yellow-50 p-4 rounded-lg max-w-md mx-auto mb-6">
                  <p className="text-sm text-yellow-800">
                    To use the breeding system, you need to be logged in and have a Tamagotchi that has reached maturity.
                  </p>
                </div>
                
                <a href="/login" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  Login to Continue
                </a>
              </div>
              
              <div className="mt-12 border-t pt-6">
                <h3 className="font-semibold mb-2">How Breeding Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🧬</div>
                    <h4 className="font-medium mb-1">Genetic Inheritance</h4>
                    <p className="text-sm text-gray-600">Offspring inherit traits from both parents with some random variation</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl mb-2">⏳</div>
                    <h4 className="font-medium mb-1">Pregnancy Period</h4>
                    <p className="text-sm text-gray-600">After breeding, there's a waiting period before offspring are born</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">✨</div>
                    <h4 className="font-medium mb-1">Rare Combinations</h4>
                    <p className="text-sm text-gray-600">Certain trait combinations can produce exceptionally rare offspring</p>
                  </div>
                </div>
              </div>
            </div>
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
