import React, { useEffect, useState } from 'react'; // Added React import
import { useTamagotchi, TamagotchiContextType } from './TamagotchiContext'; // Ensured TamagotchiContextType is imported if defined there
import { useUser } from '../auth/UserContext'; // Assuming UserContext provides user info

// Define placeholder types if they are not properly defined/exported in context
// You might need to adjust these based on the actual structure
type PlaceholderTamagotchiStats = {
  hunger: number;
  thirst: number;
  energy: number;
  happiness: number;
  cleanliness: number;
  health: number;
  // weight?: number; // Add weight if it should exist
};

type PlaceholderTamagotchiStatus = {
  isSick: boolean;
  isSleeping: boolean;
};

type PlaceholderTamagotchi = {
  stats: PlaceholderTamagotchiStats;
  status: PlaceholderTamagotchiStatus;
  // Add other properties like age if needed
  age?: number;
};


export default function HealthSystem() {
  // Attempt to get values, provide fallbacks if context is incomplete
  const context = useTamagotchi();
  const tamagotchi = context?.tamagotchi as PlaceholderTamagotchi | null ?? null; // Use original if available, else null
  const treatTamagotchi = context?.treatTamagotchi || (() => { console.warn("treatTamagotchi not found in context"); }); // Use original or placeholder

  const { user } = useUser() || {}; // Provide fallback for user context
  const [healthStatus, setHealthStatus] = useState('healthy');
  const [healthIssues, setHealthIssues] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    if (!tamagotchi) return;
    analyzeHealthStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tamagotchi]);

  const analyzeHealthStatus = () => {
    if (!tamagotchi) return;

    const issues: string[] = []; // Ensure type
    const currentRecommendations: string[] = []; // Ensure type and use different name
    let status = 'healthy';

    // Check for hunger issues
    if (tamagotchi.stats.hunger < 20) {
      issues.push('Severe hunger');
      currentRecommendations.push('Feed your Tamagotchi immediately');
      status = tamagotchi.stats.hunger < 10 ? 'critical' : 'warning';
    } else if (tamagotchi.stats.hunger < 40) {
      issues.push('Hunger');
      currentRecommendations.push('Your Tamagotchi needs food soon');
      if (status === 'healthy') status = 'warning';
    }

    // Check for thirst issues
    if (tamagotchi.stats.thirst < 20) {
      issues.push('Severe thirst');
      currentRecommendations.push('Give your Tamagotchi water immediately');
      status = tamagotchi.stats.thirst < 10 ? 'critical' : (status !== 'critical' ? 'warning' : status);
    } else if (tamagotchi.stats.thirst < 40) {
      issues.push('Thirst');
      currentRecommendations.push('Your Tamagotchi needs water soon');
       if (status === 'healthy') status = 'warning';
    }

    // Check for energy issues
    if (tamagotchi.stats.energy < 20) {
      issues.push('Exhaustion');
      currentRecommendations.push('Your Tamagotchi needs to sleep');
      status = tamagotchi.stats.energy < 10 ? 'critical' : (status !== 'critical' ? 'warning' : status);
    } else if (tamagotchi.stats.energy < 40) {
      issues.push('Tiredness');
      currentRecommendations.push('Your Tamagotchi should rest soon');
       if (status === 'healthy') status = 'warning';
    }

    // Check for happiness issues
    if (tamagotchi.stats.happiness < 20) {
      issues.push('Depression');
      currentRecommendations.push('Play with your Tamagotchi to improve its mood');
      status = tamagotchi.stats.happiness < 10 ? 'critical' : (status !== 'critical' ? 'warning' : status);
    } else if (tamagotchi.stats.happiness < 40) {
      issues.push('Sadness');
      currentRecommendations.push('Your Tamagotchi needs more attention');
       if (status === 'healthy') status = 'warning';
    }

    // Check for cleanliness issues
    if (tamagotchi.stats.cleanliness < 20) {
      issues.push('Unhygienic');
      currentRecommendations.push('Clean your Tamagotchi');
      status = tamagotchi.stats.cleanliness < 10 ? 'critical' : (status !== 'critical' ? 'warning' : status);
    } else if (tamagotchi.stats.cleanliness < 40) {
      issues.push('Dirty');
      currentRecommendations.push('Your Tamagotchi needs a bath soon');
       if (status === 'healthy') status = 'warning';
    }

    // Check for overall health
    if (tamagotchi.stats.health < 50) {
      issues.push('Poor health');
      currentRecommendations.push('Improve overall care to restore health');
      status = tamagotchi.stats.health < 30 ? 'critical' : (status !== 'critical' ? 'warning' : status);
    }

    // Check if sick
    if (tamagotchi.status.isSick) {
      issues.push('Illness');
      currentRecommendations.push('Treat your Tamagotchi with medicine');
      status = 'critical';
    }

    setHealthIssues(issues);
    setRecommendations(currentRecommendations); // Use the correct variable name
    setHealthStatus(status);
  };

  const applyTreatment = (treatmentType: string) => {
    if (!tamagotchi) return;
    if (treatTamagotchi) {
        treatTamagotchi(treatmentType);
    } else {
        console.warn("treatTamagotchi function not available");
    }
  };

  if (!tamagotchi) {
    // Maybe render a loading state or message instead of just null
    return <div>Loading Tamagotchi health...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Health Status</h2>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <div
            className={`w-4 h-4 rounded-full mr-2 ${
              healthStatus === 'healthy' ? 'bg-green-500' :
              healthStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
          ></div>
          <span className="font-medium">
            {healthStatus === 'healthy' ? 'Healthy' :
             healthStatus === 'warning' ? 'Needs Attention' : 'Critical'}
          </span>
        </div>

        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              tamagotchi.stats.health > 70 ? 'bg-green-500' :
              tamagotchi.stats.health > 30 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${tamagotchi.stats.health}%` }}
          ></div>
        </div>
        <p className="text-center text-sm mt-1">Overall Health: {tamagotchi.stats.health}%</p>
      </div>

      {healthIssues.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Health Issues</h3>
          <ul className="list-disc list-inside text-sm">
            {healthIssues.map((issue, index) => (
              <li key={index} className="text-red-600">{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Recommendations</h3>
          <ul className="list-disc list-inside text-sm">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-blue-600">{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      {tamagotchi.status.isSick && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Treatments</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => applyTreatment('Medicine')}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              💊 Medicine
            </button>
            <button
              onClick={() => applyTreatment('Rest')}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              🛌 Rest
            </button>
          </div>
        </div>
      )}

      {/* Health tips based on user lifestyle if available */}
      {user && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Health Tips</h3>
          <p className="text-sm">Your Tamagotchi's health is connected to your lifestyle. Maintaining a balanced routine will help keep your pet healthy!</p>
        </div>
      )}
    </div>
  );
}