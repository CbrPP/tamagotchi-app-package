"use client";

import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';

export default function MarketplaceSystem() {
  const { tamagotchi } = useTamagotchi();
  const [marketListings, setMarketListings] = useState<any[]>([]);
  const [myListings, setMyListings] = useState<any[]>([]);
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rarity');
  const [userBalance, setUserBalance] = useState(1000); // Mock currency balance

  useEffect(() => {
    // Generate mock marketplace listings
    generateMarketListings();
  }, []);

  const generateMarketListings = () => {
    // In a real app, these would be fetched from a database
    const mockListings = [
      {
        id: 'listing-1',
        type: 'offspring',
        name: 'Sparkle',
        evolutionType: 'Baby Blob',
        potentialEvolutionType: 'Mystic Creature',
        rarity: 8,
        price: 750,
        seller: 'Alex',
        age: 2,
        traits: {
          intelligence: 0.8,
          strength: 0.5,
          agility: 0.7
        },
        image: '🥚',
        description: 'Rare offspring with high intelligence and agility. Great potential for Mystic evolution!'
      },
      {
        id: 'listing-2',
        type: 'adult',
        name: 'Thunder',
        evolutionType: 'Athletic Runner',
        rarity: 6,
        price: 1200,
        seller: 'Sam',
        age: 25,
        traits: {
          intelligence: 0.6,
          strength: 0.9,
          agility: 0.8
        },
        image: '🐇',
        description: 'Fully evolved Athletic Runner with exceptional strength and agility.'
      },
      {
        id: 'listing-3',
        type: 'offspring',
        name: 'Pebble',
        evolutionType: 'Baby Blob',
        potentialEvolutionType: 'Healthy Sprout',
        rarity: 4,
        price: 350,
        seller: 'Jordan',
        age: 1,
        traits: {
          intelligence: 0.5,
          strength: 0.6,
          agility: 0.5
        },
        image: '🥚',
        description: 'Balanced offspring with good all-around stats. Perfect for beginners!'
      },
      {
        id: 'listing-4',
        type: 'adult',
        name: 'Sage',
        evolutionType: 'Wise Scholar',
        rarity: 7,
        price: 1500,
        seller: 'Taylor',
        age: 40,
        traits: {
          intelligence: 0.9,
          strength: 0.4,
          agility: 0.6
        },
        image: '🦉',
        description: 'Highly intelligent Wise Scholar with extensive knowledge. Excellent companion!'
      },
      {
        id: 'listing-5',
        type: 'offspring',
        name: 'Blaze',
        evolutionType: 'Baby Blob',
        potentialEvolutionType: 'Athletic Runner',
        rarity: 5,
        price: 500,
        seller: 'Morgan',
        age: 3,
        traits: {
          intelligence: 0.5,
          strength: 0.8,
          agility: 0.7
        },
        image: '🥚',
        description: 'Energetic offspring with high strength. Will likely evolve into an Athletic Runner!'
      }
    ];
    
    setMarketListings(mockListings);
  };

  const handleListForSale = () => {
    if (!tamagotchi) return;
    
    // In a real app, this would create a new listing in the database
    const newListing = {
      id: `my-listing-${Date.now()}`,
      type: 'adult',
      name: tamagotchi.name,
      evolutionType: tamagotchi.evolutionType,
      rarity: tamagotchi.dna.rarity,
      price: 1000, // Default price
      seller: 'You',
      age: tamagotchi.age,
      traits: tamagotchi.dna.traits,
      image: '🐣', // Use appropriate emoji based on evolution
      description: 'Your beloved Tamagotchi looking for a new home.',
      status: 'pending'
    };
    
    setMyListings([...myListings, newListing]);
  };

  const handlePurchase = (listing: any) => {
    if (userBalance < listing.price) {
      alert('Insufficient funds to purchase this Tamagotchi.');
      return;
    }
    
    // In a real app, this would process the purchase transaction
    setUserBalance(userBalance - listing.price);
    
    // Remove from marketplace
    setMarketListings(marketListings.filter(item => item.id !== listing.id));
    
    // Close details
    setSelectedListing(null);
    
    // Show success message
    alert(`Successfully purchased ${listing.name}!`);
  };

  const handleCancelListing = (listingId: string) => {
    // Remove from my listings
    setMyListings(myListings.filter(item => item.id !== listingId));
  };

  const filteredListings = marketListings.filter(listing => {
    if (filter === 'all') return true;
    return listing.type === filter;
  }).sort((a, b) => {
    if (sortBy === 'rarity') return b.rarity - a.rarity;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Marketplace</h2>
        <div className="text-sm font-medium bg-yellow-100 px-3 py-1 rounded-full">
          Balance: {userBalance} coins
        </div>
      </div>
      
      {/* My Listings Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">My Listings</h3>
          <button 
            onClick={handleListForSale}
            className="text-sm bg-green-100 hover:bg-green-200 text-green-800 font-medium py-1 px-3 rounded transition-colors"
          >
            List for Sale
          </button>
        </div>
        
        {myListings.length === 0 ? (
          <p className="text-sm text-gray-500">You don't have any active listings.</p>
        ) : (
          <div className="space-y-2">
            {myListings.map(listing => (
              <div key={listing.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl mr-3">
                    {listing.image}
                  </div>
                  <div>
                    <p className="font-medium">{listing.name}</p>
                    <p className="text-xs text-gray-500">{listing.status === 'pending' ? 'Pending approval' : 'Active'}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-3">{listing.price} coins</span>
                  <button 
                    onClick={() => handleCancelListing(listing.id)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Marketplace Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div>
          <label className="text-sm font-medium mr-2">Filter:</label>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="all">All Types</option>
            <option value="offspring">Offspring</option>
            <option value="adult">Adults</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium mr-2">Sort by:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="rarity">Rarity (High to Low)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>
      </div>
      
      {/* Marketplace Listings */}
      {selectedListing ? (
        <div>
          <button 
            onClick={() => setSelectedListing(null)}
            className="text-sm text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to listings
          </button>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col md:flex-row">
              <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0 flex justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl">
                  {selectedListing.image}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{selectedListing.name}</h3>
                    <p className="text-sm text-gray-600">Sold by: {selectedListing.seller}</p>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
                    {selectedListing.price} coins
                  </div>
                </div>
                
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                    Rarity: {selectedListing.rarity}/10
                  </span>
                  <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mr-2">
                    Age: {selectedListing.age} days
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {selectedListing.evolutionType}
                  </span>
                </div>
                
                <p className="mt-3">{selectedListing.description}</p>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Traits:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Intelligence:</span>
                        <span>{Math.round(selectedListing.traits.intelligence * 100)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${selectedListing.traits.intelligence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Strength:</span>
                        <span>{Math.round(selectedListing.traits.strength * 100)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${selectedListing.traits.strength * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Agility:</span>
                        <span>{Math.round(selectedListing.traits.agility * 100)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${selectedListing.traits.agility * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedListing.type === 'offspring' && selectedListing.potentialEvolutionType && (
                  <div className="mt-4">
                    <h4 className="font-medium">Evolution Potential:</h4>
                    <p className="text-sm">This offspring has potential to evolve into: <span className="font-medium">{selectedListing.potentialEvolutionType}</span></p>
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => handlePurchase(selectedListing)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    disabled={userBalance < selectedListing.price}
                  >
                    {userBalance < selectedListing.price ? 'Insufficient Funds' : `Purchase for ${selectedListing.price} coins`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredListings.map(listing => (
            <div 
              key={listing.id} 
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedListing(listing)}
            >
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mr-4">
                  {listing.image}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">{listing.name}</h4>
                    <span className="text-sm font-medium">{listing.price} coins</span>
                  </div>
                  <p className="text-sm text-gray-600">{listing.evolutionType}</p>
                  <div className="flex mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded mr-1">
                      Rarity: {listing.rarity}/10
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">
                      {listing.type === 'offspring' ? 'Offspring' : 'Adult'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {filteredListings.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No listings found matching your filters.</p>
        </div>
      )}
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-1">Marketplace Rules</h3>
        <p className="text-sm">
          The marketplace allows you to buy and sell Tamagotchis. Rare evolutions and offspring with 
          exceptional traits command higher prices. You can list your own Tamagotchi for sale or 
          purchase others to expand your collection.
        </p>
      </div>
    </div>
  );
}
