import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SunMon</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200">Dashboard</a></li>
            <li><a href="#" className="hover:text-blue-200">Reports</a></li>
            <li><a href="#" className="hover:text-blue-200">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
