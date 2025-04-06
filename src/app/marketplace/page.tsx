"use client";

import React, { useState } from 'react'; // Added React import

// Define types for listings and auctions (example structure)
interface Listing {
  id: number;
  name: string;
  owner: string;
  level: number;
  price: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary'; // Use specific types
  description: string;
  image: string;
}

interface Auction {
  id: number;
  name: string;
  owner: string;
  level: number;
  currentBid: number;
  bids: number;
  timeLeft: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary'; // Use specific types
  description: string;
  image: string;
}

interface MyListing {
   id: number;
   name: string;
   level: number;
   price: number;
   status: string; // e.g., 'Listed', 'Sold'
   views: number;
   image: string;
}

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState('browse');

  // Simulated data - replace with actual data fetching
  const [listings, setListings] = useState<Listing[]>([
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
  const [auctions, setAuctions] = useState<Auction[]>([
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
  const [myListings, setMyListings] = useState<MyListing[]>([
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

  // Function to get color class based on rarity - ADDED TYPE ANNOTATION
  const getRarityColor = (rarity: Listing['rarity'] | Auction['rarity']): string => {
    switch(rarity) {
      case 'Common': return 'bg-green-100 text-green-800';
      case 'Uncommon': return 'bg-blue-100 text-blue-800';
      case 'Rare': return 'bg-purple-100 text-purple-800';
      case 'Legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to handle tab change
  const handleTabClick = (tabName: string) => {
      setActiveTab(tabName);
      // Potentially fetch data for the new tab here
  };

  // Function to handle creating a new listing (placeholder)
  const handleCreateListing = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("Creating listing...");
      // Add logic to select Tamagotchi, set price, etc., and submit to backend/state
      alert("Listing creation feature not fully implemented yet.");
      setActiveTab('my-listings'); // Switch tab after pseudo-creation
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header can be simplified or removed if using a main layout */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between h-16">
             <div className="flex">
               <div className="flex-shrink-0 flex items-center">
                 <a href="/" className="text-xl font-bold text-blue-600">
                   Tamagotchi Life Coach
                 </a>
               </div>
                {/* Main nav links could be part of a separate layout component */}
               {/* <nav className="ml-6 flex space-x-8"> ... </nav> */}
             </div>
              <div className="flex items-center">
                {/* Login/User status could be dynamic */}
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
              {/* Top Section */}
              <div className="p-6 border-b">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                   <h1 className="text-2xl font-bold">Marketplace</h1>
                   {/* User Balance/Credits - Placeholder */}
                   <div className="flex items-center space-x-2 flex-wrap">
                     <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                       Balance: 500 Credits
                     </div>
                     <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
                       Add Credits
                     </button>
                   </div>
                 </div>
               </div>

              {/* Tabs */}
              <div className="border-b overflow-x-auto">
                 <nav className="flex -mb-px px-4 sm:px-6">
                   <button
                     onClick={() => handleTabClick('browse')}
                     className={`whitespace-nowrap py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                       activeTab === 'browse'
                         ? 'border-indigo-500 text-indigo-600'
                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                     }`}
                   >
                     Browse Listings
                   </button>
                   <button
                     onClick={() => handleTabClick('auctions')}
                     className={`whitespace-nowrap py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                       activeTab === 'auctions'
                         ? 'border-indigo-500 text-indigo-600'
                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                     }`}
                   >
                     Auctions
                   </button>
                   <button
                     onClick={() => handleTabClick('my-listings')}
                     className={`whitespace-nowrap py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                       activeTab === 'my-listings'
                         ? 'border-indigo-500 text-indigo-600'
                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                     }`}
                   >
                     My Listings
                   </button>
                   <button
                     onClick={() => handleTabClick('create')}
                     className={`whitespace-nowrap py-4 px-4 sm:px-6 font-medium text-sm border-b-2 ${
                       activeTab === 'create'
                         ? 'border-indigo-500 text-indigo-600'
                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                     }`}
                   >
                     Create Listing
                   </button>
                 </nav>
               </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                {/* Browse Listings Tab */}
                {activeTab === 'browse' && (
                  <div>
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                       {/* Search Input */}
                       <div className="relative w-full md:w-auto flex-grow md:flex-grow-0">
                         <input
                           type="text"
                           placeholder="Search listings..."
                           className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         />
                         <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                         </div>
                       </div>
                        {/* Filters/Sort */}
                       <div className="flex flex-wrap gap-2">
                         <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                           <option>All Rarity</option>
                           <option>Common</option>
                           <option>Uncommon</option>
                           <option>Rare</option>
                           <option>Legendary</option>
                         </select>
                         <select className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                           <option>Sort by: Price (Low)</option>
                           <option>Sort by: Price (High)</option>
                           <option>Sort by: Level (Low)</option>
                           <option>Sort by: Level (High)</option>
                           <option>Sort by: Newest</option>
                         </select>
                       </div>
                     </div>

                     {/* Listings Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                       {listings.map(listing => (
                         <div key={listing.id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 flex flex-col">
                           <div className="h-32 bg-gray-100 flex items-center justify-center text-4xl flex-shrink-0">
                             {listing.image}
                           </div>
                           <div className="p-4 flex flex-col flex-grow">
                             <div className="flex justify-between items-start mb-1">
                               <h3 className="font-semibold text-base line-clamp-1">{listing.name}</h3>
                               <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getRarityColor(listing.rarity)}`}>
                                 {listing.rarity}
                               </span>
                             </div>
                             <p className="text-xs text-gray-500 mb-2">Lv {listing.level} • By: {listing.owner}</p>
                             <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-grow">{listing.description}</p>
                             <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-200">
                               <span className="font-bold text-lg text-green-600">{listing.price} C</span>
                               <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
                                 Buy
                               </button>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>
                )}

                 {/* Auctions Tab */}
                {activeTab === 'auctions' && (
                   <div>
                     <div className="flex justify-between items-center mb-4">
                       <h2 className="text-lg font-semibold">Active Auctions</h2>
                       {/* Add filters/sort for auctions if needed */}
                     </div>

                     <div className="space-y-4">
                       {auctions.map(auction => (
                         <div key={auction.id} className="border rounded-lg overflow-hidden shadow flex">
                           <div className="w-1/4 sm:w-1/5 flex-shrink-0 bg-gray-100 flex items-center justify-center text-4xl p-2">
                             {auction.image}
                           </div>
                           <div className="p-4 flex-grow">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
                               <h3 className="font-semibold text-base line-clamp-1 mr-2">{auction.name}</h3>
                               <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getRarityColor(auction.rarity)}`}>
                                 {auction.rarity}
                               </span>
                              </div>
                             <p className="text-xs text-gray-500 mb-2">Lv {auction.level} • By: {auction.owner}</p>
                             <p className="text-sm text-gray-600 mb-3 line-clamp-2">{auction.description}</p>
                             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div className="text-sm">
                                    <span className="font-medium">Current Bid:</span> <span className="font-bold text-purple-600">{auction.currentBid} C</span> <span className="text-gray-500">({auction.bids} bids)</span>
                                </div>
                               <div className="flex items-center gap-2">
                                 <span className="text-sm font-medium text-red-600 whitespace-nowrap">Ends: {auction.timeLeft}</span>
                                 <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
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

                 {/* My Listings Tab */}
                 {activeTab === 'my-listings' && (
                   <div>
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                       <h2 className="text-lg font-semibold">My Active Listings</h2>
                       {/* Actions for My Listings */}
                       <div className="flex flex-wrap gap-2">
                         <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm hover:bg-blue-200">
                           View Sold History
                         </button>
                         <button onClick={() => handleTabClick('create')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                           Create New Listing
                         </button>
                       </div>
                     </div>

                     {myListings.length > 0 ? (
                       <div className="border rounded-lg overflow-hidden shadow">
                         <div className="overflow-x-auto">
                           <table className="min-w-full divide-y divide-gray-200">
                             <thead className="bg-gray-50">
                               <tr>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamagotchi</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Level</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Views</th>
                                 <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                     {listing.level}
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                     {listing.price} C
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap">
                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                       {listing.status}
                                     </span>
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
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
                       </div>
                     ) : (
                       <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                         <div className="text-4xl mb-4">📦</div>
                         <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Listings</h3>
                         <p className="text-gray-500 mb-4">You haven't listed any Tamagotchis yet.</p>
                         <button onClick={() => handleTabClick('create')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                           Create Listing
                         </button>
                       </div>
                     )}
                   </div>
                 )}

                 {/* Create Listing Tab */}
                {activeTab === 'create' && (
                   <form onSubmit={handleCreateListing}>
                     <h2 className="text-lg font-semibold mb-4">Create New Listing</h2>

                     {/* Warning Box */}
                     <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                       <div className="flex-shrink-0 text-yellow-500 pt-0.5">
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M8.257 3.099c.626-1.43 2.86-1.43 3.486 0l5.58 12.767c.538 1.23-.228 2.634-1.59 2.634H4.261c-1.362 0-2.128-1.403-1.59-2.634l5.58-12.767zM10 12a1 1 0 100-2 1 1 0 000 2zm-1.17-5.83a1.17 1.17 0 112.34 0 .75.75 0 00-.22 1.465l-.04.015-.04.015a.75.75 0 00.22 1.465 1.17 1.17 0 11-2.34 0 .75.75 0 00.22-1.465l.04-.015.04-.015a.75.75 0 00-.22-1.465z" clipRule="evenodd" />
                         </svg>
                       </div>
                       <div className="flex-1">
                         <h3 className="text-sm font-medium text-yellow-800">Please Note</h3>
                         <div className="text-sm text-yellow-700 mt-1">
                           <p>Once a Tamagotchi is listed, it becomes unavailable for care actions until the listing is removed or sold. A 5% marketplace fee applies to successful sales.</p>
                         </div>
                       </div>
                     </div>

                     {/* Form Layout */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {/* Tamagotchi Selection (Left Column) */}
                       <div className="md:col-span-1">
                         <div className="bg-gray-50 p-4 rounded-lg h-full">
                           <h3 className="text-sm font-medium text-gray-700 mb-3">Select Tamagotchi to List</h3>
                           <div className="space-y-3">
                              {/* Replace with dynamic list of user's Tamagotchis */}
                             <div className="border rounded-lg p-3 bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
                               <div className="flex items-center">
                                 <input type="radio" name="tamagotchi" id="tama1" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" required/>
                                 <label htmlFor="tama1" className="ml-3 flex items-center flex-1 cursor-pointer">
                                   <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-lg mr-3 flex-shrink-0">
                                     🏃
                                   </div>
                                   <div className="overflow-hidden">
                                     <div className="text-sm font-medium text-gray-900 truncate">Athletic Runner</div>
                                     <div className="text-xs text-gray-500">Level 10</div>
                                   </div>
                                 </label>
                               </div>
                             </div>
                             <div className="border rounded-lg p-3 bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
                               <div className="flex items-center">
                                 <input type="radio" name="tamagotchi" id="tama2" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" required/>
                                 <label htmlFor="tama2" className="ml-3 flex items-center flex-1 cursor-pointer">
                                   <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-lg mr-3 flex-shrink-0">
                                     🌱
                                   </div>
                                   <div className="overflow-hidden">
                                     <div className="text-sm font-medium text-gray-900 truncate">Healthy Sprout</div>
                                     <div className="text-xs text-gray-500">Level 5</div>
                                   </div>
                                 </label>
                               </div>
                             </div>
                              {/* Add more selectable Tamagotchis here */}
                           </div>
                         </div>
                       </div>

                       {/* Listing Details (Right Column) */}
                       <div className="md:col-span-2">
                         <div className="space-y-4">
                            {/* Listing Type */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                             <div className="flex space-x-4">
                               <div className="flex items-center">
                                 <input type="radio" name="listingType" id="fixed" value="fixed" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" defaultChecked />
                                 <label htmlFor="fixed" className="ml-2 text-sm text-gray-900">Fixed Price</label>
                               </div>
                               <div className="flex items-center">
                                 <input type="radio" name="listingType" id="auction" value="auction" className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                                 <label htmlFor="auction" className="ml-2 text-sm text-gray-900">Auction</label>
                               </div>
                             </div>
                           </div>

                           {/* Price Input */}
                           <div>
                             <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price (Credits)</label>
                             <input
                                type="number"
                                id="price"
                                name="price"
                                className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter price or starting bid"
                                min="1"
                                required
                              />
                           </div>

                           {/* Description */}
                           <div>
                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                             <textarea
                               id="description"
                               name="description"
                               className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                               rows={4}
                               placeholder="Highlight your Tamagotchi's special traits, stats, or history..."
                             ></textarea>
                           </div>

                           {/* Duration */}
                           <div>
                             <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Listing Duration</label>
                             <select
                                id="duration"
                                name="duration"
                                className="w-full border rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                defaultValue="7"
                             >
                               <option value="3">3 days</option>
                               <option value="7">7 days</option>
                               <option value="14">14 days</option>
                               <option value="30">30 days</option>
                             </select>
                           </div>

                           {/* Submit Button */}
                           <div className="pt-4">
                             <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                               Create Listing
                             </button>
                           </div>
                         </div>
                       </div>
                     </div>
                   </form>
                 )}

              </div>
            </div>
          </div>
        </div>
      </main>

       {/* Simplified Footer */}
       <footer className="bg-white mt-12 py-6 border-t">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <p className="text-center text-gray-500 text-sm">
             © {new Date().getFullYear()} Tamagotchi Life Coach. All rights reserved.
           </p>
         </div>
       </footer>
    </div>
  );
}