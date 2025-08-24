import React from 'react';
import { Filter, X, MapPin, Clock, Package } from 'lucide-react';
import { FilterState } from '../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  filters, 
  onFilterChange, 
  isOpen, 
  onClose,
  isMinimized,
  onToggleMinimize
}) => {
  const handleFilterChange = (key: keyof FilterState, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      foodType: 'all',
      distance: 10,
      quantity: '',
      urgentOnly: false,
      sortBy: 'latest',
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto bg-white shadow-lg lg:shadow-sm 
        border-r border-gray-200 z-50 lg:z-auto transform transition-all duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isMinimized ? 'lg:w-16' : 'w-80 lg:w-full'}
      `}>
        <div className={`${isMinimized ? 'p-2' : 'p-6'}`}>
          {/* Header */}
          <div className={`flex items-center justify-between ${isMinimized ? 'mb-2' : 'mb-6'}`}>
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-blue-600 mr-2" />
              {!isMinimized && <h3 className="text-lg font-semibold text-gray-800">Filters</h3>}
            </div>
            <div className="flex items-center space-x-2">
              {!isMinimized && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onToggleMinimize}
                className="hidden lg:block p-1 text-gray-500 hover:text-gray-700"
                title={isMinimized ? 'Expand Filters' : 'Minimize Filters'}
              >
                {isMinimized ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                )}
              </button>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isMinimized ? (
            /* Minimized View */
            <div className="space-y-4">
              <button
                onClick={onToggleMinimize}
                className="w-full p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Expand Filters"
              >
                <Filter className="w-5 h-5 mx-auto" />
              </button>
            </div>
          ) : (
            /* Full View */
            <>
          {/* Food Type Filter */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Food Type</h4>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Food', icon: '🍽️' },
                { value: 'veg', label: 'Vegetarian', icon: '🌱' },
                { value: 'non-veg', label: 'Non-Vegetarian', icon: '🍖' },
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="foodType"
                    value={option.value}
                    checked={filters.foodType === option.value}
                    onChange={(e) => handleFilterChange('foodType', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    filters.foodType === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {filters.foodType === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700">
                    {option.icon} {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Distance Filter */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-700">Distance</h4>
            </div>
            <div className="space-y-3">
              <input
                type="range"
                min="1"
                max="50"
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 km</span>
                <span className="font-medium text-blue-600">{filters.distance} km</span>
                <span>50 km</span>
              </div>
            </div>
          </div>

          {/* Quantity Filter */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Package className="w-4 h-4 text-gray-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-700">Minimum Quantity</h4>
            </div>
            <input
              type="text"
              value={filters.quantity}
              onChange={(e) => handleFilterChange('quantity', e.target.value)}
              placeholder="e.g., 10 meals"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Urgency Filter */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Clock className="w-4 h-4 text-gray-500 mr-2" />
              <h4 className="text-sm font-medium text-gray-700">Urgency</h4>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={filters.urgentOnly}
                onChange={(e) => handleFilterChange('urgentOnly', e.target.checked)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                filters.urgentOnly
                  ? 'border-red-500 bg-red-500'
                  : 'border-gray-300'
              }`}>
                {filters.urgentOnly && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700">Soon to expire (within 2 hours)</span>
            </label>
          </div>

          {/* Sort Options */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By</h4>
            <div className="space-y-2">
              {[
                { value: 'nearest', label: 'Nearest First' },
                { value: 'quantity', label: 'Most Quantity' },
                { value: 'latest', label: 'Latest Added' },
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    filters.sortBy === option.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {filters.sortBy === option.value && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;