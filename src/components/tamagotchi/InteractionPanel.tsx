import { useTamagotchi } from '../tamagotchi/TamagotchiContext';

export default function InteractionPanel() {
  const { 
    tamagotchi, 
    feedTamagotchi, 
    giveDrink, 
    playWithTamagotchi, 
    takeTamagotchiForWalk,
    putTamagotchiToSleep,
    wakeTamagotchiUp,
    cleanTamagotchi
  } = useTamagotchi();

  if (!tamagotchi) {
    return null;
  }

  const handleFeed = () => {
    feedTamagotchi('Basic Pellet');
  };

  const handlePlay = () => {
    playWithTamagotchi('Ball');
  };

  const handleWalk = () => {
    takeTamagotchiForWalk(15); // 15 minutes walk
  };

  const handleSleep = () => {
    if (tamagotchi.status.isSleeping) {
      wakeTamagotchiUp();
    } else {
      putTamagotchiToSleep();
    }
  };

  return (
    <div className="bg-white/80 rounded-lg shadow-md p-4 backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 text-center">Care Options</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button 
          onClick={handleFeed}
          className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">🍎</span>
          <span>Feed</span>
        </button>
        
        <button 
          onClick={giveDrink}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">💧</span>
          <span>Water</span>
        </button>
        
        <button 
          onClick={handlePlay}
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">🎮</span>
          <span>Play</span>
        </button>
        
        <button 
          onClick={handleWalk}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">🚶</span>
          <span>Walk</span>
        </button>
        
        <button 
          onClick={handleSleep}
          className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">{tamagotchi.status.isSleeping ? '⏰' : '😴'}</span>
          <span>{tamagotchi.status.isSleeping ? 'Wake' : 'Sleep'}</span>
        </button>
        
        <button 
          onClick={cleanTamagotchi}
          className="bg-teal-100 hover:bg-teal-200 text-teal-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">🚿</span>
          <span>Clean</span>
        </button>
        
        <button 
          className="bg-pink-100 hover:bg-pink-200 text-pink-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">💬</span>
          <span>Talk</span>
        </button>
        
        <button 
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors flex flex-col items-center"
        >
          <span className="text-2xl mb-1">⚙️</span>
          <span>More</span>
        </button>
      </div>
    </div>
  );
}
