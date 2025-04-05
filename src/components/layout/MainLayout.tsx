"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { UserProvider } from '../auth/UserContext';
import { TamagotchiProvider } from '../tamagotchi/TamagotchiContext';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <UserProvider>
        <TamagotchiProvider>
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                      Tamagotchi Life Coach
                    </Link>
                  </div>
                  <nav className="ml-6 flex space-x-8">
                    <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Dashboard
                    </Link>
                    <Link href="/care" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Care
                    </Link>
                    <Link href="/evolution" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Evolution
                    </Link>
                    <Link href="/lifestyle" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Lifestyle
                    </Link>
                    <Link href="/ai" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      AI Chat
                    </Link>
                    <Link href="/breeding" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Breeding
                    </Link>
                    <Link href="/marketplace" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                      Marketplace
                    </Link>
                  </nav>
                </div>
                <div className="flex items-center">
                  <Link href="/login" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-white mt-12 py-6 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                &copy; 2025 Tamagotchi Life Coach. All rights reserved.
              </p>
            </div>
          </footer>
        </TamagotchiProvider>
      </UserProvider>
    </div>
  );
}
