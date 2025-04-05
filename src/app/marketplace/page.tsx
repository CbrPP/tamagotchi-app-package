"use client";

import { useState } from 'react';

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('browse');
  const [listings, setListings] = useState([
    {
      id: 1,
      name: 'Athletic Runner',
      owner: 'TamaTrainer123',
      level: 12,
      price: 250,
      rarity: 'Uncommon',
      description: 'Well-trained Athletic Runner with exceptional speed stats. Perfect for competitive players.',
      image: '🏃'
    },
    {
      id: 2,
      name: 'Wise Scholar',
      owner: 'BookWorm42',
      level: 15,
      price: 320,
      rarity: 'Uncommon',
      description: 'Highly intelligent Wise Scholar with extensive knowledge. Great companion for intellectual challenges.',
      image: '🦉'
    },
    {
      id: 3,
      name: 'Mystic Creature',
      owner: 'RareTamaCollector',
      level: 20,
      price: 1200,
      rarity: 'Rare',
      description: 'Extremely rare Mystic Creature with unique abilities. One of only 50 in existence!',
      image: '✨'
    },
    {
      id: 4,
      name: 'Healthy Sprout',
      owner: 'GreenThumb99',
      level: 8,
      price: 120,
      rarity: 'Common',
      description: 'Vibrant Healthy Sprout with balanced stats. Perfect starter for new players.',
      image: '🌱'
    }
  ]);
  const [auctions, setAuctions] = useState([
    {
      id: 101,
      name: 'Legendary Phoenix',
      owner: 'MythicBreeder',
      level: 30,
      currentBid: 2500,
      bids: 12,
      timeLeft: '2 days',
      rarity: 'Legendary',
      description: 'Ultra-rare Legendary Phoenix with fire abilities. Only 5 known to exist!',
      image: '🔥'
    },
    {
      id: 102,
      name: 'Crystal Dragon',
      owner: 'DragonMaster',
      level: 25,
      currentBid: 1800,
      bids: 8,
      timeLeft: '5 hours',
      rarity: 'Rare',
      description: 'Beautiful Crystal Dragon with ice powers. Perfect for collectors!',
      image: '❄️'
    }
  ]);
  const [myListings, setMyListings] = useState([
    {
      id: 201,
      name: 'Athletic Runner',
      level: 10,
      price: 200,
      status: 'Listed',
      views: 15,
      image: '🏃'
    }
  ]);
  
  // In a real implementation, we would use the actual Tamagotchi context
  // For now, we'll just show a placeholder with simulated data
  
  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'Common': return 'bg-green-100 text-green-800';
      case 'Uncommon': return 'bg-blue-100 text-blue-800';
      case 'Rare': return 'bg-purple-100 text-purple-800';
      case 'Legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
                <a href="/lifestyle" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Lifestyle
                </a>
                <a href="/ai" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  AI Chat
                </a>
                <a href="/breeding" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Breeding
                </a>
                <a href="/marketplace" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
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
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold">Marketplace</h1>
                  <div className="flex space-x-2">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      Balance: 500 Credits
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                      Add Credits
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-b">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('browse')}
                    className={`py-4 px-6 font-medium text-sm ${
                      activeTab === 'browse'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Browse Listings
                  </button>
                  <button
                    onClick={() => setActiveTab('auctions')}
                    className={`py-4 px-6 font-medium text-sm ${
                      activeTab === 'auctions'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Auctions
                  </button>
                  <button
                    onClick={() => setActiveTab('my-listings')}
                    className={`py-4 px-6 font-medium text-sm ${
                      activeTab === 'my-listings'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    My Listings
                  </button>
                  <button
                    onClick={() => setActiveTab('create')}
                    className={`py-4 px-6 font-medium text-sm ${
                      activeTab === 'create'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Create Listing
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'browse' && (
                  <div>
                    <div className="flex justify-between mb-4">
                      <div className="relative w-64">
                        <input
                          type="text"
                          placeholder="Search listings..."
                          className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                          🔍
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <select className="border rounded-md px-3 py-2">
                          <option>All Types</option>
                          <option>Common</option>
                          <option>Uncommon</option>
                          <option>Rare</option>
                          <option>Legendary</option>
                        </select>
                        <select className="border rounded-md px-3 py-2">
                          <option>Sort by: Price (Low to High)</option>
                          <option>Sort by: Price (High to Low)</option>
                          <option>Sort by: Level (Low to High)</option>
                          <option>Sort by: Level (High to Low)</option>
                          <option>Sort by: Newest</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {listings.map(listing => (
                        <div key={listing.id} className="border rounded-lg overflow-hidden">
                          <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl">
                            {listing.image}
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold">{listing.name}</h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(listing.rarity)}`}>
                                {listing.rarity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Level {listing.level} • Owner: {listing.owner}</p>
                            <p className="text-sm text-gray-600 mb-4">{listing.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="font-bold">{listing.price} Credits</span>
                              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'auctions' && (
                  <div>
                    <div className="flex justify-between mb-4">
                      <h2 className="text-lg font-semibold">Active Auctions</h2>
                      <button className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md text-sm hover:bg-purple-200">
                        View All Auctions
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {auctions.map(auction => (
                        <div key={auction.id} className="border rounded-lg overflow-hidden">
                          <div className="flex">
                            <div className="w-1/3 bg-gray-100 flex items-center justify-center text-4xl">
                              {auction.image}
                            </div>
                            <div className="w-2/3 p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold">{auction.name}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full ${getRarityColor(auction.rarity)}`}>
                                  {auction.rarity}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">Level {auction.level} • Owner: {auction.owner}</p>
                              <p className="text-sm text-gray-600 mb-3">{auction.description}</p>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold">{auction.currentBid} Credits</span>
                                <span className="text-sm text-gray-500">{auction.bids} bids</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-red-500">Ends in: {auction.timeLeft}</span>
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm">
                                  Place Bid
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'my-listings' && (
                  <div>
                    <div className="flex justify-between mb-4">
                      <h2 className="text-lg font-semibold">My Active Listings</h2>
                      <div className="flex space-x-2">
                        <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm hover:bg-blue-200">
                          View Sold History
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                          Create New Listing
                        </button>
                      </div>
                    </div>
                    
                    {myListings.length > 0 ? (
                      <div className="border rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamagotchi</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {myListings.map(listing => (
                              <tr key={listing.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                                      {listing.image}
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">{listing.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {listing.level}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {listing.price} Credits
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {listing.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {listing.views}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                  <button className="text-red-600 hover:text-red-900">Remove</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <div className="text-4xl mb-4">📦</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Listings</h3>
                        <p className="text-gray-500 mb-4">You don't have any Tamagotchis listed on the marketplace.</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                          Create Your First Listing
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'create' && (
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Create New Listing</h2>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-yellow-400 text-lg">⚠️</span>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Please Note</h3>
                          <div className="text-sm text-yellow-700">
                            <p>
                              Once a Tamagotchi is listed, it will be unavailable for use until the listing is removed or sold.
                              A 5% marketplace fee will be applied to all successful sales.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium mb-3">Select Tamagotchi</h3>
                          <div className="space-y-4">
                            <div className="border rounded-lg p-3 bg-white">
                              <div className="flex items-center">
                                <input type="radio" name="tamagotchi" id="tama1" className="h-4 w-4 text-indigo-600" />
                                <label htmlFor="tama1" className="ml-3 flex items-center">
                                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-lg mr-3">
                                    🏃
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Athletic Runner</div>
                                    <div className="text-xs text-gray-500">Level 10</div>
                                  </div>
                                </label>
                              </div>
                            </div>
                            
                            <div className="border rounded-lg p-3 bg-white">
                              <div className="flex items-center">
                                <input type="radio" name="tamagotchi" id="tama2" className="h-4 w-4 text-indigo-600" />
                                <label htmlFor="tama2" className="ml-3 flex items-center">
                                  <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-lg mr-3">
                                    🌱
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium">Healthy Sprout</div>
                                    <div className="text-xs text-gray-500">Level 5</div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                            <div className="flex space-x-4">
                              <div className="flex items-center">
                                <input type="radio" name="listingType" id="fixed" className="h-4 w-4 text-indigo-600" checked />
                                <label htmlFor="fixed" className="ml-2 text-sm text-gray-700">Fixed Price</label>
                              </div>
                              <div className="flex items-center">
                                <input type="radio" name="listingType" id="auction" className="h-4 w-4 text-indigo-600" />
                                <label htmlFor="auction" className="ml-2 text-sm text-gray-700">Auction</label>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (Credits)</label>
                            <input type="number" className="w-full border rounded-md px-3 py-2" placeholder="Enter price" />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea 
                              className="w-full border rounded-md px-3 py-2" 
                              rows={4}
                              placeholder="Describe your Tamagotchi's special traits and features"
                            ></textarea>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <select className="w-full border rounded-md px-3 py-2">
                              <option>3 days</option>
                              <option>7 days</option>
                              <option>14 days</option>
                              <option>30 days</option>
                            </select>
                          </div>
                          
                          <div className="pt-4">
                            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md">
                              Create Listing
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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
