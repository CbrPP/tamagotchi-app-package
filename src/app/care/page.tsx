"use client";

import { useState } from 'react';

export default function CarePage() {
  const [careStats, setCareStats] = useState({
    hunger: 65,
    happiness: 70,
    energy: 80,
    hygiene: 75,
    health: 85
  });
  
  // In a real implementation, we would use the actual Tamagotchi context
  // For now, we'll just show a placeholder with simulated interactions
  
  const handleFeed = () => {
    setCareStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 15),
      energy: Math.min(100, prev.energy + 5),
      happiness: Math.min(100, prev.happiness + 3)
    }));
  };
  
  const handlePlay = () => {
    setCareStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      energy: Math.max(0, prev.energy - 10),
      hunger: Math.max(0, prev.hunger - 5)
    }));
  };
  
  const handleSleep = () => {
    setCareStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 25),
      health: Math.min(100, prev.health + 5)
    }));
  };
  
  const handleClean = () => {
    setCareStats(prev => ({
      ...prev,
      hygiene: Math.min(100, prev.hygiene + 20),
      health: Math.min(100, prev.health + 3)
    }));
  };
  
  const handleMedicine = () => {
    setCareStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 15)
    }));
  };
  
  const handleWater = () => {
    setCareStats(prev => ({
      ...prev,
      hunger: Math.min(100, prev.hunger + 5),
      health: Math.min(100, prev.health + 3)
    }));
  };
  
  const handleWalk = () => {
    setCareStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 10),
      energy: Math.max(0, prev.energy - 8),
      health: Math.min(100, prev.health + 5),
      hunger: Math.max(0, prev.hunger - 8)
    }));
  };

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
                <a href="/care" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
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
                <a href="/breeding" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
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
              <h1 className="text-2xl font-bold mb-6">Care Menu</h1>
              
              {/* Tamagotchi Display */}
              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-5xl">😊</span>
                </div>
              </div>
              
              {/* Status Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Hunger</span>
                    <span>{careStats.hunger}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${careStats.hunger > 70 ? 'bg-green-500' : careStats.hunger > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${careStats.hunger}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Happiness</span>
                    <span>{careStats.happiness}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${careStats.happiness > 70 ? 'bg-green-500' : careStats.happiness > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${careStats.happiness}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Energy</span>
                    <span>{careStats.energy}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${careStats.energy > 70 ? 'bg-green-500' : careStats.energy > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${careStats.energy}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Hygiene</span>
                    <span>{careStats.hygiene}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${careStats.hygiene > 70 ? 'bg-green-500' : careStats.hygiene > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${careStats.hygiene}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex justify-between mb-1">
                    <span>Health</span>
                    <span>{careStats.health}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${careStats.health > 70 ? 'bg-green-500' : careStats.health > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${careStats.health}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Care Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={handleFeed}
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">🍔</span>
                  <span>Feed</span>
                </button>
                
                <button 
                  onClick={handlePlay}
                  className="bg-pink-100 hover:bg-pink-200 text-pink-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">🎮</span>
                  <span>Play</span>
                </button>
                
                <button 
                  onClick={handleSleep}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">😴</span>
                  <span>Sleep</span>
                </button>
                
                <button 
                  onClick={handleClean}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">🚿</span>
                  <span>Clean</span>
                </button>
                
                <button 
                  onClick={handleMedicine}
                  className="bg-red-100 hover:bg-red-200 text-red-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">💊</span>
                  <span>Medicine</span>
                </button>
                
                <button 
                  onClick={handleWater}
                  className="bg-cyan-100 hover:bg-cyan-200 text-cyan-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">💧</span>
                  <span>Water</span>
                </button>
                
                <button 
                  onClick={handleWalk}
                  className="bg-green-100 hover:bg-green-200 text-green-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">🚶</span>
                  <span>Walk</span>
                </button>
                
                <button 
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-4 rounded-lg flex flex-col items-center transition-colors"
                >
                  <span className="text-2xl mb-2">❓</span>
                  <span>More</span>
                </button>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Care Tips</h3>
                <ul className="text-sm space-y-2">
                  <li>• Regular feeding keeps your Tamagotchi happy and healthy</li>
                  <li>• Balance play time with rest for optimal development</li>
                  <li>• Keep hygiene high to prevent illness</li>
                  <li>• Different foods affect different stats - experiment!</li>
                  <li>• Your care patterns will influence how your Tamagotchi evolves</li>
                </ul>
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
