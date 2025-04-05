"use client";

import { useState } from 'react';

export default function LifestylePage() {
  const [userLifestyleData, setUserLifestyleData] = useState({
    sleepSchedule: { bedtime: '23:00', wakeTime: '07:00' },
    mealTimes: { breakfast: '08:00', lunch: '12:30', dinner: '19:00' },
    exerciseRoutine: { days: ['Monday', 'Wednesday', 'Friday'], time: '18:00', duration: 45 },
    waterIntake: { target: 8, current: 3 },
    screenTime: { limit: 120, current: 95 }
  });
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [lastSynced, setLastSynced] = useState(new Date().toLocaleTimeString());
  
  // In a real implementation, we would use the actual Tamagotchi context
  // For now, we'll just show a placeholder with simulated data
  
  const updateLifestyleSettings = (category, key, value) => {
    setUserLifestyleData(prev => {
      const newData = { ...prev };
      newData[category][key] = value;
      return newData;
    });
  };
  
  const toggleSyncEnabled = () => {
    setSyncEnabled(!syncEnabled);
  };
  
  const handleSyncNow = () => {
    // Simulate syncing
    setLastSynced(new Date().toLocaleTimeString());
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
                <a href="/evolution" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Evolution
                </a>
                <a href="/lifestyle" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
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
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Lifestyle Integration</h1>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Sync</span>
                  <button 
                    onClick={toggleSyncEnabled}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 ${syncEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <span 
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${syncEnabled ? 'translate-x-6' : 'translate-x-1'}`} 
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500">
                  Last synced: {lastSynced}
                </p>
                <button 
                  onClick={handleSyncNow}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                >
                  Sync Now
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Tamagotchi Status */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h2 className="font-semibold mb-3">Tamagotchi Status</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                      <span className="text-3xl">😊</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Pixel</h3>
                      <p className="text-sm text-gray-600">Baby Blob</p>
                      <p className="text-xs text-gray-500">Mirroring your lifestyle</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sleep Quality</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Nutrition</span>
                        <span>60%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Activity Level</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500" 
                          style={{ width: '45%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Fitness Device Integration */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h2 className="font-semibold mb-3">Fitness Device Integration</h2>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">⌚</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Fitness Watch</h3>
                        <p className="text-xs text-gray-500">Not connected</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-purple-200 text-purple-700 rounded-md text-sm hover:bg-purple-300">
                      Connect
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg">📱</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Health App</h3>
                        <p className="text-xs text-gray-500">Not connected</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-purple-200 text-purple-700 rounded-md text-sm hover:bg-purple-300">
                      Connect
                    </button>
                  </div>
                  
                  <p className="text-sm text-purple-700 mt-2">
                    Connect your fitness devices to automatically sync your activity data with your Tamagotchi.
                  </p>
                </div>
              </div>
              
              {/* Sleep Schedule */}
              <div className="mb-6">
                <h2 className="font-semibold mb-3">Sleep Schedule</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedtime</label>
                    <input 
                      type="time" 
                      value={userLifestyleData.sleepSchedule.bedtime}
                      onChange={(e) => updateLifestyleSettings('sleepSchedule', 'bedtime', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wake Time</label>
                    <input 
                      type="time" 
                      value={userLifestyleData.sleepSchedule.wakeTime}
                      onChange={(e) => updateLifestyleSettings('sleepSchedule', 'wakeTime', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your Tamagotchi will sleep and wake with you.
                </p>
              </div>
              
              {/* Meal Times */}
              <div className="mb-6">
                <h2 className="font-semibold mb-3">Meal Times</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Breakfast</label>
                    <input 
                      type="time" 
                      value={userLifestyleData.mealTimes.breakfast}
                      onChange={(e) => updateLifestyleSettings('mealTimes', 'breakfast', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lunch</label>
                    <input 
                      type="time" 
                      value={userLifestyleData.mealTimes.lunch}
                      onChange={(e) => updateLifestyleSettings('mealTimes', 'lunch', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dinner</label>
                    <input 
                      type="time" 
                      value={userLifestyleData.mealTimes.dinner}
                      onChange={(e) => updateLifestyleSettings('mealTimes', 'dinner', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your Tamagotchi will eat when you eat.
                </p>
              </div>
              
              {/* Exercise Routine */}
              <div className="mb-6">
                <h2 className="font-semibold mb-3">Exercise Routine</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input 
                      type="time" 
                      value={userLifestyleData.exerciseRoutine.time}
                      onChange={(e) => updateLifestyleSettings('exerciseRoutine', 'time', e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                    <input 
                      type="number" 
                      value={userLifestyleData.exerciseRoutine.duration}
                      onChange={(e) => updateLifestyleSettings('exerciseRoutine', 'duration', parseInt(e.target.value))}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                  <div className="flex flex-wrap gap-1">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <button 
                        key={day}
                        onClick={() => {
                          const days = [...userLifestyleData.exerciseRoutine.days];
                          if (days.includes(day)) {
                            updateLifestyleSettings('exerciseRoutine', 'days', days.filter(d => d !== day));
                          } else {
                            updateLifestyleSettings('exerciseRoutine', 'days', [...days, day]);
                          }
                        }}
                        className={`text-xs px-2 py-1 rounded ${
                          userLifestyleData.exerciseRoutine.days.includes(day) 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your Tamagotchi will exercise with you.
                </p>
              </div>
              
              {/* Water & Screen Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="font-semibold mb-3">Water Intake</h2>
                  <div className="flex items-center mb-2">
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: `${(userLifestyleData.waterIntake.current / userLifestyleData.waterIntake.target) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {userLifestyleData.waterIntake.current}/{userLifestyleData.waterIntake.target}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => updateLifestyleSettings('waterIntake', 'current', Math.max(0, userLifestyleData.waterIntake.current - 1))}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <button 
                      onClick={() => updateLifestyleSettings('waterIntake', 'current', Math.min(userLifestyleData.waterIntake.target, userLifestyleData.waterIntake.current + 1))}
                      className="text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
                    >
                      + Glass
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold mb-3">Screen Time</h2>
                  <div className="flex items-center mb-2">
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          userLifestyleData.screenTime.current > userLifestyleData.screenTime.limit 
                            ? 'bg-red-500' 
                            : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(100, (userLifestyleData.screenTime.current / userLifestyleData.screenTime.limit) * 100)}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">
                      {userLifestyleData.screenTime.current}/{userLifestyleData.screenTime.limit} min
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {userLifestyleData.screenTime.current > userLifestyleData.screenTime.limit 
                      ? 'Excessive screen time affects your Tamagotchi\'s health.' 
                      : 'Moderate screen time is good for both of you.'}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">How Lifestyle Integration Works</h3>
                <p className="text-sm">
                  Your daily habits directly affect your Tamagotchi's wellbeing. Healthy sleep patterns,
                  regular meals, exercise, and good hydration will help your Tamagotchi thrive.
                  Sync your lifestyle to create a stronger bond with your virtual pet!
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
