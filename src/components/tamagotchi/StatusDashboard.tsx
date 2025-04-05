import React from 'react'; // Added React import
import { useTamagotchi } from './TamagotchiContext'; // Adjusted import path assuming context is in the same folder

// Define placeholder types if they are not properly defined/exported in context
// You might need to adjust these based on the actual structure
type PlaceholderTamagotchiStats = {
  hunger: number;
  thirst: number;
  energy: number;
  happiness: number;
  cleanliness: number;
  health: number;
  // weight?: number; // Weight is optional or removed based on the previous error
};

type PlaceholderTamagotchiStatus = {
  isSick: boolean;
  isSleeping: boolean;
};

type PlaceholderTamagotchi = {
  stats: PlaceholderTamagotchiStats;
  status: PlaceholderTamagotchiStatus;
  age: number; // Assuming age exists
};


export default function StatusDashboard() {
  const context = useTamagotchi();
  const tamagotchi = context?.tamagotchi as PlaceholderTamagotchi | null ?? null; // Use original if available, else null


  if (!tamagotchi) {
     // Maybe render a loading state or message instead of just null
    return <div>Loading Tamagotchi status...</div>;
  }

  // Helper function to determine color based on stat value
  const getColorClass = (value: number) => {
    if (value > 70) return 'bg-green-500';
    if (value > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/80 rounded-lg shadow-md p-4 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-center">Status</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Hunger */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">Hunger</div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getColorClass(tamagotchi.stats.hunger)}`}
              style={{ width: `${tamagotchi.stats.hunger}%` }}
            ></div>
          </div>
          <div className="text-xs mt-1">{tamagotchi.stats.hunger}%</div>
        </div>

        {/* Thirst */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">Thirst</div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getColorClass(tamagotchi.stats.thirst)}`}
              style={{ width: `${tamagotchi.stats.thirst}%` }}
            ></div>
          </div>
          <div className="text-xs mt-1">{tamagotchi.stats.thirst}%</div>
        </div>

        {/* Happiness */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">Happiness</div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getColorClass(tamagotchi.stats.happiness)}`}
              style={{ width: `${tamagotchi.stats.happiness}%` }}
            ></div>
          </div>
          <div className="text-xs mt-1">{tamagotchi.stats.happiness}%</div>
        </div>

        {/* Energy */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">Energy</div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getColorClass(tamagotchi.stats.energy)}`}
              style={{ width: `${tamagotchi.stats.energy}%` }}
            ></div>
          </div>
          <div className="text-xs mt-1">{tamagotchi.stats.energy}%</div>
        </div>

        {/* Health */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">Health</div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getColorClass(tamagotchi.stats.health)}`}
              style={{ width: `${tamagotchi.stats.health}%` }}
            ></div>
          </div>
          <div className="text-xs mt-1">{tamagotchi.stats.health}%</div>
        </div>

        {/* Cleanliness */}
        <div className="flex flex-col items-center">
          <div className="text-sm font-medium mb-1">Cleanliness</div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getColorClass(tamagotchi.stats.cleanliness)}`}
              style={{ width: `${tamagotchi.stats.cleanliness}%` }}
            ></div>
          </div>
          <div className="text-xs mt-1">{tamagotchi.stats.cleanliness}%</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="text-sm">
          <span className="font-medium">Age:</span> {tamagotchi.age} days
        </div>
        {/* Weight display removed due to previous type error */}
        {/* {tamagotchi.stats.weight && ( // Optionally display weight if the property exists
           <div className="text-sm">
             <span className="font-medium">Weight:</span> {tamagotchi.stats.weight.toFixed(1)} kg
           </div>
        )} */}
        <div className="text-sm">
          <span className="font-medium">Status:</span> {tamagotchi.status.isSick ? 'Sick' : tamagotchi.status.isSleeping ? 'Sleeping' : 'Awake'}
        </div>
      </div>
    </div>
  );
}