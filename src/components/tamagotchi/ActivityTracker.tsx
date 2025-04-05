"use client";

import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';

interface ActivityTrackerProps {
  onActivityDetected?: (activity: string, duration: number) => void;
}

export default function ActivityTracker({ onActivityDetected }: ActivityTrackerProps) {
  const { tamagotchi, updateTamagotchiBasedOnActivity } = useTamagotchi();
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [activityDuration, setActivityDuration] = useState(0);
  const [activityHistory, setActivityHistory] = useState<Array<{type: string, duration: number, timestamp: Date}>>([]);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [motionPermission, setMotionPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  // Simulate requesting permissions
  useEffect(() => {
    // In a real app, this would use the browser's permission API
    setTimeout(() => {
      setLocationPermission('granted');
      setMotionPermission('granted');
    }, 1500);
  }, []);

  // Simulate activity detection
  useEffect(() => {
    if (locationPermission !== 'granted' || motionPermission !== 'granted') return;
    
    // This is a simplified simulation of activity detection
    // In a real app, this would use device sensors and location data
    
    const activities = ['walking', 'running', 'cycling', 'stationary'];
    const activityIntervals = [15000, 30000, 45000]; // 15s, 30s, 45s
    
    // Randomly select an activity every 5-10 seconds
    const activityInterval = setInterval(() => {
      const shouldBeActive = Math.random() > 0.3; // 70% chance of activity
      
      if (shouldBeActive) {
        const newActivity = activities[Math.floor(Math.random() * activities.length)];
        const duration = activityIntervals[Math.floor(Math.random() * activityIntervals.length)] / 1000;
        
        setCurrentActivity(newActivity);
        setActivityDuration(duration);
        
        // Add to history
        setActivityHistory(prev => [
          { type: newActivity, duration, timestamp: new Date() },
          ...prev.slice(0, 9) // Keep only the last 10 activities
        ]);
        
        // Notify parent component
        if (onActivityDetected) {
          onActivityDetected(newActivity, duration);
        }
        
        // Update Tamagotchi based on activity
        if (updateTamagotchiBasedOnActivity) {
          updateTamagotchiBasedOnActivity(newActivity, duration);
        }
        
        // Clear activity after duration
        setTimeout(() => {
          setCurrentActivity(null);
        }, 3000); // Show for 3 seconds
      }
    }, 7000); // Check every 7 seconds
    
    return () => clearInterval(activityInterval);
  }, [locationPermission, motionPermission, onActivityDetected, updateTamagotchiBasedOnActivity]);

  if (!tamagotchi) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Activity Tracker</h2>
      
      {/* Permissions */}
      {(locationPermission !== 'granted' || motionPermission !== 'granted') && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Permissions Required</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${
                locationPermission === 'granted' ? 'bg-green-500' : 
                locationPermission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span>Location Access: {locationPermission}</span>
            </div>
            <div className="flex items-center">
              <div className={`w-4 h-4 rounded-full mr-2 ${
                motionPermission === 'granted' ? 'bg-green-500' : 
                motionPermission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span>Motion Sensors: {motionPermission}</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Activity tracking requires access to your location and motion sensors to detect your activities.
          </p>
        </div>
      )}
      
      {/* Current Activity */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Current Activity</h3>
        {currentActivity ? (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                {currentActivity === 'walking' && '🚶'}
                {currentActivity === 'running' && '🏃'}
                {currentActivity === 'cycling' && '🚴'}
                {currentActivity === 'stationary' && '🧍'}
              </div>
              <div>
                <p className="font-medium capitalize">{currentActivity}</p>
                <p className="text-sm text-gray-600">Duration: {activityDuration} seconds</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No activity detected</p>
        )}
      </div>
      
      {/* Activity History */}
      <div>
        <h3 className="font-semibold mb-2">Recent Activities</h3>
        {activityHistory.length === 0 ? (
          <p className="text-gray-500">No activity history yet</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {activityHistory.map((activity, index) => (
              <div key={index} className="bg-gray-50 p-2 rounded flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                  {activity.type === 'walking' && '🚶'}
                  {activity.type === 'running' && '🏃'}
                  {activity.type === 'cycling' && '🚴'}
                  {activity.type === 'stationary' && '🧍'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium capitalize">{activity.type}</p>
                  <p className="text-xs text-gray-500">
                    {activity.duration}s at {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-1">How Activity Tracking Works</h3>
        <p className="text-sm">
          Your activities are automatically detected and affect your Tamagotchi's wellbeing.
          Walking, running, and other exercises improve your Tamagotchi's health and happiness.
        </p>
      </div>
    </div>
  );
}
