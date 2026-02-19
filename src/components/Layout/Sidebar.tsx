import React from 'react';
import { ALL_REGIONS, ALL_CATEGORIES } from '../../data/salesData';
import { FilterState } from '../../types';

interface SidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ filters, onFilterChange }) => {
  const handleDateChange = (key: 'start' | 'end', value: string) => {
    const newRange: [string, string] =
      key === 'start' ? [value, filters.dateRange[1]] : [filters.dateRange[0], value];
    onFilterChange({ ...filters, dateRange: newRange });
  };

  const handleRegionToggle = (region: string) => {
    const current = filters.regions;
    const updated = current.includes(region)
      ? current.filter((r) => r !== region)
      : [...current, region];
    if (updated.length > 0) {
      onFilterChange({ ...filters, regions: updated });
    }
  };

  const handleCategoryToggle = (category: string) => {
    const current = filters.categories;
    const updated = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    if (updated.length > 0) {
      onFilterChange({ ...filters, categories: updated });
    }
  };

  const handleResetFilters = () => {
    onFilterChange({
      dateRange: ['2024-01-01', '2024-12-31'],
      regions: [...ALL_REGIONS],
      categories: [...ALL_CATEGORIES],
    });
  };

  return (
    <aside className="bg-white shadow-lg w-64 flex flex-col border-r border-gray-100 min-h-screen">
      {/* Brand */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SP</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-800">SalesPerf</h1>
            <p className="text-[11px] text-gray-400">Analytics Dashboard</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 p-4 space-y-5 overflow-y-auto">
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Filters
          </h3>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Date Range</label>
          <input
            type="date"
            value={filters.dateRange[0]}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-1.5"
          />
          <input
            type="date"
            value={filters.dateRange[1]}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Regions */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Regions</label>
          <div className="space-y-1">
            {ALL_REGIONS.map((region) => (
              <label
                key={region}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={filters.regions.includes(region)}
                  onChange={() => handleRegionToggle(region)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {region}
              </label>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Categories</label>
          <div className="space-y-1">
            {ALL_CATEGORIES.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Reset */}
        <button
          onClick={handleResetFilters}
          className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-[11px] text-gray-400 text-center">
          © 2024 Sales Performance Dashboard
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
