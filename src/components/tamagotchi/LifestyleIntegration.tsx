"use client";

import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';
import { useUser } from '../auth/UserContext';

export default function LifestyleIntegration() {
  const { tamagotchi, updateTamagotchiBasedOnActivity } = useTamagotchi();
  const { user } = useUser();
  const [userLifestyleData, setUserLifestyleData] = useState({
    sleepSchedule: { bedtime: '23:00', wakeTime: '07:00' },
    mealTimes: { breakfast: '08:00', lunch: '12:30', dinner: '19:00' },
    exerciseRoutine: { days: ['Monday', 'Wednesday', 'Friday'], time: '18:00', duration: 45 },
    waterIntake: { target: 8, current: 3 },
    screenTime: { limit: 120, current: 95 }
  });
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);

  // Simulate lifestyle sync
  useEffect(() => {
    if (!tamagotchi || !syncEnabled) return;
    
    const syncInterval = setInterval(() => {
      syncLifestyleData();
    }, 300000); // Sync every 5 minutes
    
    // Initial sync
    syncLifestyleData();
    
    return () => clearInterval(syncInterval);
  }, [tamagotchi, syncEnabled]);

  // Check for lifestyle events
  useEffect(() => {
    if (!tamagotchi || !syncEnabled || !lastSynced) return;
    
    const timeStr = currentTime.toTimeString().substring(0, 5);
    const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][currentTime.getDay()];
    
    // Check sleep time
    if (timeStr === userLifestyleData.sleepSchedule.bedtime) {
      handleSleepTime();
    }
    
    // Check wake time
    if (timeStr === userLifestyleData.sleepSchedule.wakeTime) {
      handleWakeTime();
    }
    
    // Check meal times
    if (timeStr === userLifestyleData.mealTimes.breakfast) {
      handleMealTime('breakfast');
    } else if (timeStr === userLifestyleData.mealTimes.lunch) {
      handleMealTime('lunch');
    } else if (timeStr === userLifestyleData.mealTimes.dinner) {
      handleMealTime('dinner');
    }
    
    // Check exercise time
    if (userLifestyleData.exerciseRoutine.days.includes(day) && 
        timeStr === userLifestyleData.exerciseRoutine.time) {
      handleExerciseTime();
    }
  }, [currentTime, tamagotchi, syncEnabled, lastSynced, userLifestyleData]);

  const syncLifestyleData = () => {
    // In a real app, this would fetch data from health apps, calendar, etc.
    // For demo, we'll just update the last synced time
    setLastSynced(new Date());
    
    // Simulate some random changes to lifestyle data
    setUserLifestyleData(prev => ({
      ...prev,
      waterIntake: { ...prev.waterIntake, current: Math.min(prev.waterIntake.target, prev.waterIntake.current + Math.floor(Math.random() * 2)) },
      screenTime: { ...prev.screenTime, current: prev.screenTime.current + Math.floor(Math.random() * 15) }
    }));
  };

  const handleSleepTime = () => {
    if (!tamagotchi || !updateTamagotchiBasedOnActivity) return;
    
    // Put Tamagotchi to sleep when user goes to sleep
    updateTamagotchiBasedOnActivity('sleep', 480); // 8 hours in minutes
  };

  const handleWakeTime = () => {
    if (!tamagotchi || !updateTamagotchiBasedOnActivity) return;
    
    // Wake up Tamagotchi when user wakes up
    updateTamagotchiBasedOnActivity('wake', 0);
  };

  const handleMealTime = (mealType: string) => {
    if (!tamagotchi || !updateTamagotchiBasedOnActivity) return;
    
    // Feed Tamagotchi when user eats
    if (mealType === 'breakfast') {
      updateTamagotchiBasedOnActivity('eat', 20);
    } else if (mealType === 'lunch') {
      updateTamagotchiBasedOnActivity('eat', 30);
    } else if (mealType === 'dinner') {
      updateTamagotchiBasedOnActivity('eat', 40);
    }
  };

  const handleExerciseTime = () => {
    if (!tamagotchi || !updateTamagotchiBasedOnActivity) return;
    
    // Exercise Tamagotchi when user exercises
    updateTamagotchiBasedOnActivity('exercise', userLifestyleData.exerciseRoutine.duration);
  };

  const updateLifestyleSettings = (category: string, key: string, value: any) => {
    setUserLifestyleData(prev => {
      const newData = { ...prev };
      (newData as any)[category][key] = value;
      return newData;
    });
  };

  const toggleSyncEnabled = () => {
    setSyncEnabled(!syncEnabled);
  };

  if (!tamagotchi) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lifestyle Integration</h2>
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
      
      {lastSynced && (
        <p className="text-xs text-gray-500 mb-4">
          Last synced: {lastSynced.toLocaleTimeString()}
        </p>
      )}
      
      {/* Sleep Schedule */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Sleep Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
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
        <h3 className="font-semibold mb-2">Meal Times</h3>
        <div className="grid grid-cols-3 gap-2">
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
        <h3 className="font-semibold mb-2">Exercise Routine</h3>
        <div className="grid grid-cols-2 gap-4 mb-2">
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
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Water Intake</h3>
          <div className="flex items-center">
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
          <div className="flex justify-between mt-2">
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
          <h3 className="font-semibold mb-2">Screen Time</h3>
          <div className="flex items-center">
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
          <p className="text-xs text-gray-500 mt-1">
            {userLifestyleData.screenTime.current > userLifestyleData.screenTime.limit 
              ? 'Excessive screen time affects your Tamagotchi\'s health.' 
              : 'Moderate screen time is good for both of you.'}
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-1">How Lifestyle Integration Works</h3>
        <p className="text-sm">
          Your daily habits directly affect your Tamagotchi's wellbeing. Healthy sleep patterns,
          regular meals, exercise, and good hydration will help your Tamagotchi thrive.
          Sync your lifestyle to create a stronger bond with your virtual pet!
        </p>
      </div>
    </div>
  );
}
