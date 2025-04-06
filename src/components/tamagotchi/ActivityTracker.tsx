"use client";

import React, { useEffect, useState } from 'react'; // Added React import
import { useTamagotchi } from './TamagotchiContext';

interface ActivityTrackerProps {
  onActivityDetected?: (activity: string, duration: number) => void;
}

export default function ActivityTracker({ onActivityDetected }: ActivityTrackerProps) {
  // Corrected destructuring: updateTamagotchiBasedOnActivity is not available on context type
  const { tamagotchi } = useTamagotchi() || {}; // Get tamagotchi, handle null context
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [activityDuration, setActivityDuration] = useState(0);
  const [activityHistory, setActivityHistory] = useState<Array<{type: string, duration: number, timestamp: Date}>>([]);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'pending'>('pending');
  const [motionPermission, setMotionPermission] = useState<'granted' | 'denied' | 'pending'>('pending');

  // Simulate requesting permissions
  useEffect(() => {
    // In a real app, this would use the browser's permission API
    const timer = setTimeout(() => { // Added timer for cleanup
      // Simulate granting permissions for demo purposes
      if (locationPermission === 'pending') setLocationPermission('granted');
      if (motionPermission === 'pending') setMotionPermission('granted');
    }, 1500);
     return () => clearTimeout(timer); // Cleanup timeout
  }, [locationPermission, motionPermission]); // Rerun if permissions change

  // Simulate activity detection
  useEffect(() => {
    // Don't run simulation if permissions aren't granted
    if (locationPermission !== 'granted' || motionPermission !== 'granted') return;

    // This is a simplified simulation of activity detection
    // In a real app, this would use device sensors and location data

    const activities = ['walking', 'running', 'cycling', 'stationary'];
    const activityIntervals = [15000, 30000, 45000]; // 15s, 30s, 45s

    // Randomly select an activity every 7 seconds
    const activityTimer = setInterval(() => {
      const shouldBeActive = Math.random() > 0.3; // 70% chance of activity

      if (shouldBeActive) {
        const newActivity = activities[Math.floor(Math.random() * activities.length)];
        // Duration in seconds
        const duration = activityIntervals[Math.floor(Math.random() * activityIntervals.length)] / 1000;

        setCurrentActivity(newActivity);
        setActivityDuration(duration);

        // Add to history
        setActivityHistory(prev => [
          { type: newActivity, duration, timestamp: new Date() },
          ...prev.slice(0, 9) // Keep only the last 10 activities
        ]);

        // Notify parent component if callback is provided
        onActivityDetected?.(newActivity, duration);


        // Update Tamagotchi based on activity - THIS FUNCTIONALITY IS DISABLED
        // because updateTamagotchiBasedOnActivity is not defined in context
        /*
        if (updateTamagotchiBasedOnActivity) { // Check if function exists (it doesn't in current context)
          updateTamagotchiBasedOnActivity(newActivity, duration);
        } else {
            console.warn("updateTamagotchiBasedOnActivity function not available in context");
        }
        */

        // Clear activity indicator after 3 seconds
        const clearActivityTimeout = setTimeout(() => {
          setCurrentActivity(null);
        }, 3000);

        // Return cleanup for the timeout inside interval
        return () => clearTimeout(clearActivityTimeout);
      } else {
         // If not active, ensure current activity is null
         setCurrentActivity(null);
      }
    }, 7000); // Check every 7 seconds

    // Cleanup interval on unmount or when dependencies change
    return () => clearInterval(activityTimer);
    // Removed updateTamagotchiBasedOnActivity from dependencies as it's not used
  }, [locationPermission, motionPermission, onActivityDetected]);


  // Don't render anything if Tamagotchi data isn't loaded yet
  if (!tamagotchi) {
    return <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">Loading Activity Tracker...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Activity Tracker</h2>

      {/* Permissions */}
      {(locationPermission !== 'granted' || motionPermission !== 'granted') && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Permissions Required</h3>
          <div className="space-y-1">
            <div className="flex items-center text-sm">
              <div className={`w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                locationPermission === 'granted' ? 'bg-green-500' :
                locationPermission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span>Location Access: {locationPermission}</span>
            </div>
            <div className="flex items-center text-sm">
              <div className={`w-3 h-3 rounded-full mr-2 flex-shrink-0 ${
                motionPermission === 'granted' ? 'bg-green-500' :
                motionPermission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span>Motion Sensors: {motionPermission}</span>
            </div>
          </div>
          {locationPermission === 'pending' || motionPermission === 'pending' ? (
             <p className="text-xs text-gray-600 mt-2">Requesting permissions...</p>
          ) : (
            <p className="text-xs text-red-600 mt-2">
              Activity tracking requires access to location and motion sensors. Please grant permissions in your device settings.
            </p>
          )
          }
        </div>
      )}

      {/* Current Activity */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">Current Activity</h3>
        {currentActivity ? (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-xl">
                {currentActivity === 'walking' && '🚶'}
                {currentActivity === 'running' && '🏃'}
                {currentActivity === 'cycling' && '🚴'}
                {currentActivity === 'stationary' && '🧍'}
              </div>
              <div>
                <p className="font-medium capitalize text-blue-800">{currentActivity}</p>
                <p className="text-sm text-gray-600">Duration: {activityDuration} seconds</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No activity detected right now.</p>
        )}
      </div>

      {/* Activity History */}
      <div>
        <h3 className="font-semibold mb-2 text-gray-700">Recent Activities</h3>
        {activityHistory.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No activity history yet.</p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto border rounded-md p-2 bg-gray-50">
            {activityHistory.map((activity, index) => (
              <div key={index} className="bg-white p-2 rounded shadow-sm flex items-center">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-2 text-sm flex-shrink-0">
                  {activity.type === 'walking' && '🚶'}
                  {activity.type === 'running' && '🏃'}
                  {activity.type === 'cycling' && '🚴'}
                  {activity.type === 'stationary' && '🧍'}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium capitalize truncate">{activity.type}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {activity.duration}s @ {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {/* Formatted time */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Informational Box */}
       <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
         <h3 className="text-sm font-semibold text-indigo-800 mb-1">How Activity Tracking Works</h3>
         <p className="text-xs text-indigo-700">
           (Simulation) Your activities are detected and influence your Tamagotchi's wellbeing. Staying active helps keep your pet happy and healthy! Real integration requires device permissions.
         </p>
       </div>
    </div>
  );
}