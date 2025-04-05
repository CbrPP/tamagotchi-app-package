import { useTamagotchi } from '../tamagotchi/TamagotchiContext';

export default function StatusDashboard() {
  const { tamagotchi } = useTamagotchi();

  if (!tamagotchi) {
    return null;
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
        {/* Weight line removed due to type error */}
        <div className="text-sm">
          <span className="font-medium">Status:</span> {tamagotchi.status.isSick ? 'Sick' : tamagotchi.status.isSleeping ? 'Sleeping' : 'Awake'}
        </div>
      </div>
    </div>
  );
}