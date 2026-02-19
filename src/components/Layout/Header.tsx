import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Sales Performance Analytics
          </h2>
          <p className="text-sm text-gray-500">
            Real-time insights to drive business growth
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 hidden sm:block">
            Data Period: Jan 2024 – Dec 2024
          </span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              SA
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800">Sales Analyst</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
