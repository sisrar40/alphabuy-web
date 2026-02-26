import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-white py-12 border-t border-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-2xl font-black font-display bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-6">
            Alphabuy
          </div>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} AlphaBuy Adventure. Crafted for splash & joy.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
