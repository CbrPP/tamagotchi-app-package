"use client";

import { useState } from 'react';

export default function EvolutionPage() {
  const [evolutionData, setEvolutionData] = useState({
    currentForm: 'Baby Blob',
    evolutionLevel: 1,
    evolutionProgress: 45,
    possibleEvolutions: [
      {
        name: 'Healthy Sprout',
        requirements: 'Focus on balanced nutrition and regular exercise',
        description: 'A vibrant, energetic form that thrives on physical activity and healthy eating',
        rarity: 'Common'
      },
      {
        name: 'Athletic Runner',
        requirements: 'High exercise, moderate nutrition, regular sleep schedule',
        description: 'A fast, agile form with exceptional stamina and physical capabilities',
        rarity: 'Uncommon'
      },
      {
        name: 'Wise Scholar',
        requirements: 'Mental stimulation, balanced lifestyle, regular learning activities',
        description: 'An intelligent form with enhanced problem-solving abilities and wisdom',
        rarity: 'Uncommon'
      },
      {
        name: 'Mystic Creature',
        requirements: 'Perfect balance of all stats, special care patterns',
        description: 'A rare, magical form with unique abilities and appearance',
        rarity: 'Rare'
      }
    ],
    evolutionHistory: [
      { form: 'Egg', achievedAt: '3 days ago' },
      { form: 'Baby Blob', achievedAt: '2 days ago' }
    ]
  });
  
  // In a real implementation, we would use the actual Tamagotchi context
  // For now, we'll just show a placeholder with simulated data
  
  const getEvolutionPathColor = (rarity) => {
    switch(rarity) {
      case 'Common': return 'bg-green-100 text-green-800 border-green-200';
      case 'Uncommon': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Rare': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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
                <a href="/care" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Care
                </a>
                <a href="/evolution" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
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
              <h1 className="text-2xl font-bold mb-6">Evolution System</h1>
              
              {/* Current Form */}
              <div className="mb-8 text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-5xl">🐣</span>
                </div>
                <h2 className="text-xl font-semibold">{evolutionData.currentForm}</h2>
                <p className="text-gray-500">Evolution Level: {evolutionData.evolutionLevel}</p>
                
                <div className="max-w-md mx-auto mt-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Progress to next evolution</span>
                    <span>{evolutionData.evolutionProgress}%</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500" 
                      style={{ width: `${evolutionData.evolutionProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Evolution Paths */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Possible Evolution Paths</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {evolutionData.possibleEvolutions.map((evolution, index) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-4 ${getEvolutionPathColor(evolution.rarity)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{evolution.name}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                          {evolution.rarity}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{evolution.description}</p>
                      <div className="text-xs mt-2">
                        <strong>Requirements:</strong> {evolution.requirements}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Evolution History */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Evolution History</h2>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {/* Timeline events */}
                  <div className="space-y-6 relative">
                    {evolutionData.evolutionHistory.map((event, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white relative z-10">
                          {index === 0 ? '🥚' : '🐣'}
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">{event.form}</h3>
                          <p className="text-sm text-gray-500">{event.achievedAt}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Current position */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white relative z-10">
                        ?
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">Next Evolution</h3>
                        <p className="text-sm text-gray-500">Coming soon...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">How Evolution Works</h3>
                <p className="text-sm">
                  Your Tamagotchi evolves based on how you care for it. Different care patterns lead to different evolutions.
                  For example, focusing on exercise might lead to an Athletic evolution, while balanced care might unlock rare forms.
                  The better you care for your Tamagotchi, the faster it will evolve!
                </p>
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
