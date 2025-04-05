"use client";

import { useEffect, useState } from 'react';
import { useUser } from '../auth/UserContext';
import { useTamagotchi } from './TamagotchiContext';

export default function FitnessDeviceIntegration() {
  const { user } = useUser();
  const { tamagotchi, updateTamagotchiBasedOnActivity } = useTamagotchi();
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [healthData, setHealthData] = useState({
    steps: 0,
    heartRate: 0,
    caloriesBurned: 0,
    sleepHours: 0,
    lastSynced: null as Date | null
  });
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // Simulate device connection
  useEffect(() => {
    // In a real app, this would check for previously connected devices
    const savedDevices = localStorage.getItem('connectedFitnessDevices');
    if (savedDevices) {
      try {
        setConnectedDevices(JSON.parse(savedDevices));
      } catch (error) {
        console.error('Error parsing saved devices:', error);
      }
    }
  }, []);

  // Simulate periodic data sync
  useEffect(() => {
    if (connectedDevices.length === 0) return;
    
    // Simulate initial data load
    generateMockHealthData();
    
    // Set up periodic sync
    const syncInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to sync
        syncHealthData();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(syncInterval);
  }, [connectedDevices]);

  // Update Tamagotchi based on health data
  useEffect(() => {
    if (!tamagotchi || !healthData.lastSynced) return;
    
    // In a real app, this would be more sophisticated
    if (healthData.steps > 5000) {
      updateTamagotchiBasedOnActivity('walking', 30);
    }
    
    if (healthData.caloriesBurned > 300) {
      updateTamagotchiBasedOnActivity('exercise', 20);
    }
    
    if (healthData.sleepHours >= 7) {
      // Good sleep helps Tamagotchi's energy and health
      updateTamagotchiBasedOnActivity('rest', 60);
    }
  }, [healthData, tamagotchi, updateTamagotchiBasedOnActivity]);

  const connectDevice = (deviceType: string) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      const newDevices = [...connectedDevices, deviceType];
      setConnectedDevices(newDevices);
      localStorage.setItem('connectedFitnessDevices', JSON.stringify(newDevices));
      setIsConnecting(false);
      
      // Generate initial data
      generateMockHealthData();
    }, 2000);
  };

  const disconnectDevice = (deviceType: string) => {
    const newDevices = connectedDevices.filter(device => device !== deviceType);
    setConnectedDevices(newDevices);
    localStorage.setItem('connectedFitnessDevices', JSON.stringify(newDevices));
  };

  const syncHealthData = () => {
    setSyncStatus('syncing');
    
    // Simulate sync process
    setTimeout(() => {
      generateMockHealthData();
      setSyncStatus('success');
      
      // Reset status after a delay
      setTimeout(() => {
        setSyncStatus('idle');
      }, 3000);
    }, 2000);
  };

  const generateMockHealthData = () => {
    // In a real app, this would fetch data from fitness APIs
    const now = new Date();
    const newData = {
      steps: 2000 + Math.floor(Math.random() * 8000),
      heartRate: 60 + Math.floor(Math.random() * 40),
      caloriesBurned: 100 + Math.floor(Math.random() * 400),
      sleepHours: 5 + Math.random() * 4,
      lastSynced: now
    };
    
    setHealthData(newData);
  };

  if (!tamagotchi) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Fitness Device Integration</h2>
      
      {/* Connected Devices */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Connected Devices</h3>
        
        {connectedDevices.length === 0 ? (
          <p className="text-gray-500 mb-4">No devices connected yet.</p>
        ) : (
          <div className="space-y-2 mb-4">
            {connectedDevices.map(device => (
              <div key={device} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl mr-3">
                    {device === 'Fitbit' && '⌚'}
                    {device === 'Apple Watch' && '⌚'}
                    {device === 'Smartphone' && '📱'}
                  </div>
                  <div>
                    <p className="font-medium">{device}</p>
                    <p className="text-xs text-gray-500">
                      {healthData.lastSynced 
                        ? `Last synced: ${healthData.lastSynced.toLocaleTimeString()}` 
                        : 'Not synced yet'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => disconnectDevice(device)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Disconnect
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Connect New Device */}
        {connectedDevices.length < 3 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Connect a device:</h4>
            <div className="flex flex-wrap gap-2">
              {!connectedDevices.includes('Fitbit') && (
                <button 
                  onClick={() => connectDevice('Fitbit')}
                  disabled={isConnecting}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  + Fitbit
                </button>
              )}
              {!connectedDevices.includes('Apple Watch') && (
                <button 
                  onClick={() => connectDevice('Apple Watch')}
                  disabled={isConnecting}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  + Apple Watch
                </button>
              )}
              {!connectedDevices.includes('Smartphone') && (
                <button 
                  onClick={() => connectDevice('Smartphone')}
                  disabled={isConnecting}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm transition-colors disabled:opacity-50"
                >
                  + Smartphone
                </button>
              )}
            </div>
            {isConnecting && (
              <p className="text-sm text-gray-500 mt-2">Connecting device...</p>
            )}
          </div>
        )}
        
        {/* Sync Button */}
        {connectedDevices.length > 0 && (
          <button 
            onClick={syncHealthData}
            disabled={syncStatus === 'syncing'}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded transition-colors disabled:opacity-50"
          >
            {syncStatus === 'syncing' ? 'Syncing...' : 
             syncStatus === 'success' ? 'Sync Successful!' : 
             syncStatus === 'error' ? 'Sync Failed' : 
             'Sync Health Data'}
          </button>
        )}
      </div>
      
      {/* Health Data */}
      {connectedDevices.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Your Health Data</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <span className="text-xl mr-2">👣</span>
                <span className="font-medium">Steps</span>
              </div>
              <p className="text-2xl font-bold">{healthData.steps.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Daily Goal: 10,000</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <span className="text-xl mr-2">❤️</span>
                <span className="font-medium">Heart Rate</span>
              </div>
              <p className="text-2xl font-bold">{healthData.heartRate} bpm</p>
              <p className="text-xs text-gray-500">Resting</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <span className="text-xl mr-2">🔥</span>
                <span className="font-medium">Calories</span>
              </div>
              <p className="text-2xl font-bold">{healthData.caloriesBurned}</p>
              <p className="text-xs text-gray-500">Active Calories</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center mb-1">
                <span className="text-xl mr-2">😴</span>
                <span className="font-medium">Sleep</span>
              </div>
              <p className="text-2xl font-bold">{healthData.sleepHours.toFixed(1)} hrs</p>
              <p className="text-xs text-gray-500">Last Night</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Impact on Tamagotchi */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Impact on {tamagotchi.name}</h3>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm">
            Your health data directly affects your Tamagotchi's wellbeing:
          </p>
          <ul className="mt-2 text-sm space-y-1">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-xs mr-2">✓</span>
              <span>Steps increase your Tamagotchi's activity level</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-xs mr-2">✓</span>
              <span>Good sleep helps your Tamagotchi's energy and health</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center text-xs mr-2">✓</span>
              <span>Active calories burned improve your Tamagotchi's fitness</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-1">How Device Integration Works</h3>
        <p className="text-sm">
          Connect your fitness devices to sync your real-life activity with your Tamagotchi.
          The more active and healthy you are, the better your Tamagotchi will feel!
        </p>
      </div>
    </div>
  );
}
