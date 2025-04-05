"use client";

import { useState } from 'react';

export default function DashboardPage() {
  const [tamagotchiStats, setTamagotchiStats] = useState({
    name: 'Pixel',
    evolutionType: 'Baby Blob',
    age: 3,
    stats: {
      hunger: 65,
      happiness: 70,
      energy: 80,
      hygiene: 75,
      health: 85
    },
    status: {
      isSleeping: false,
      isSick: false,
      isPlaying: false
    }
  });
  
  // In a real implementation, we would use the actual Tamagotchi context
  // For now, we'll just show a placeholder with simulated data
  
  const getStatusText = () => {
    if (tamagotchiStats.status.isSleeping) return 'Sleeping';
    if (tamagotchiStats.status.isSick) return 'Sick';
    if (tamagotchiStats.status.isPlaying) return 'Playing';
    
    if (tamagotchiStats.stats.hunger < 30) return 'Hungry';
    if (tamagotchiStats.stats.happiness < 30) return 'Sad';
    if (tamagotchiStats.stats.energy < 30) return 'Tired';
    if (tamagotchiStats.stats.hygiene < 30) return 'Dirty';
    
    return 'Happy';
  };
  
  const getStatusEmoji = () => {
    if (tamagotchiStats.status.isSleeping) return '😴';
    if (tamagotchiStats.status.isSick) return '🤒';
    if (tamagotchiStats.status.isPlaying) return '🎮';
    
    if (tamagotchiStats.stats.hunger < 30) return '🥺';
    if (tamagotchiStats.stats.happiness < 30) return '😢';
    if (tamagotchiStats.stats.energy < 30) return '😩';
    if (tamagotchiStats.stats.hygiene < 30) return '🧼';
    
    return '😊';
  };
  
  const getEvolutionProgress = () => {
    // In a real app, this would be calculated based on care history
    return 45; // Percentage
  };
  
  const getNextEvolution = () => {
    // In a real app, this would be determined by care patterns
    return 'Healthy Sprout';
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
                <a href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
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
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Tamagotchi Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-6">
                    <span className="text-5xl">{getStatusEmoji()}</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{tamagotchiStats.name}</h1>
                    <p className="text-blue-100">Type: {tamagotchiStats.evolutionType}</p>
                    <p className="text-blue-100">Age: {tamagotchiStats.age} days</p>
                    <p className="text-blue-100">Status: {getStatusText()}</p>
                  </div>
                </div>
              </div>
              
              {/* Dashboard Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Stats Panel */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Stats</h2>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Hunger</span>
                          <span>{tamagotchiStats.stats.hunger}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${tamagotchiStats.stats.hunger > 70 ? 'bg-green-500' : tamagotchiStats.stats.hunger > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${tamagotchiStats.stats.hunger}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Happiness</span>
                          <span>{tamagotchiStats.stats.happiness}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${tamagotchiStats.stats.happiness > 70 ? 'bg-green-500' : tamagotchiStats.stats.happiness > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${tamagotchiStats.stats.happiness}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Energy</span>
                          <span>{tamagotchiStats.stats.energy}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${tamagotchiStats.stats.energy > 70 ? 'bg-green-500' : tamagotchiStats.stats.energy > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${tamagotchiStats.stats.energy}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Hygiene</span>
                          <span>{tamagotchiStats.stats.hygiene}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${tamagotchiStats.stats.hygiene > 70 ? 'bg-green-500' : tamagotchiStats.stats.hygiene > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${tamagotchiStats.stats.hygiene}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Health</span>
                          <span>{tamagotchiStats.stats.health}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${tamagotchiStats.stats.health > 70 ? 'bg-green-500' : tamagotchiStats.stats.health > 30 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${tamagotchiStats.stats.health}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Evolution Panel */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Evolution Progress</h2>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Progress to next evolution</span>
                        <span>{getEvolutionProgress()}%</span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500" 
                          style={{ width: `${getEvolutionProgress()}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Next evolution: {getNextEvolution()}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-1">Evolution Tips</h3>
                      <p className="text-sm text-blue-700">
                        Your care patterns determine how your Tamagotchi evolves. 
                        Focus on exercise and balanced nutrition for a Healthy Sprout evolution.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <a 
                      href="/care"
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-lg flex flex-col items-center transition-colors"
                    >
                      <span className="text-2xl mb-1">🍔</span>
                      <span className="text-sm">Feed</span>
                    </a>
                    
                    <a 
                      href="/care"
                      className="bg-pink-100 hover:bg-pink-200 text-pink-800 p-3 rounded-lg flex flex-col items-center transition-colors"
                    >
                      <span className="text-2xl mb-1">🎮</span>
                      <span className="text-sm">Play</span>
                    </a>
                    
                    <a 
                      href="/care"
                      className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 p-3 rounded-lg flex flex-col items-center transition-colors"
                    >
                      <span className="text-2xl mb-1">😴</span>
                      <span className="text-sm">Sleep</span>
                    </a>
                    
                    <a 
                      href="/care"
                      className="bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-lg flex flex-col items-center transition-colors"
                    >
                      <span className="text-2xl mb-1">🚿</span>
                      <span className="text-sm">Clean</span>
                    </a>
                  </div>
                </div>
                
                {/* Activity Log */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      <li className="p-3">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">🍔</span>
                          <div>
                            <p className="text-sm font-medium">Fed with Apple</p>
                            <p className="text-xs text-gray-500">Today, 10:23 AM</p>
                          </div>
                        </div>
                      </li>
                      <li className="p-3">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">🎮</span>
                          <div>
                            <p className="text-sm font-medium">Played Ball Game</p>
                            <p className="text-xs text-gray-500">Today, 9:15 AM</p>
                          </div>
                        </div>
                      </li>
                      <li className="p-3">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">😴</span>
                          <div>
                            <p className="text-sm font-medium">Slept for 8 hours</p>
                            <p className="text-xs text-gray-500">Yesterday, 11:30 PM</p>
                          </div>
                        </div>
                      </li>
                      <li className="p-3">
                        <div className="flex items-center">
                          <span className="text-xl mr-3">🚿</span>
                          <div>
                            <p className="text-sm font-medium">Took a Bath</p>
                            <p className="text-xs text-gray-500">Yesterday, 7:45 PM</p>
                          </div>
                        </div>
                      </li>
                    </ul>
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
