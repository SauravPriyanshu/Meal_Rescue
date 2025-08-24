import React, { useState } from 'react';
import { Filter, Search, MapPin } from 'lucide-react';
import Layout from './Layout';
import FoodCard from './FoodCard';
import FilterSidebar from './FilterSidebar';
import ReservationModal from './ReservationModal';
import { mockFoodDonations } from '../data/mockData';
import { FilterState, ReservationData } from '../types';

const BrowseFoodPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    foodType: 'all',
    distance: 10,
    quantity: '',
    urgentOnly: false,
    sortBy: 'latest',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterMinimized, setIsFilterMinimized] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);
  const [donations, setDonations] = useState(mockFoodDonations);

  const filteredDonations = donations.filter(donation => {
    // Apply filters
    if (filters.foodType !== 'all' && donation.foodType !== filters.foodType) {
      return false;
    }
    
    if (filters.urgentOnly) {
      const expiryTime = new Date(donation.expiryTime);
      const now = new Date();
      const hoursUntilExpiry = (expiryTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (hoursUntilExpiry > 2) return false;
    }
    
    if (filters.quantity && !donation.quantity.toLowerCase().includes(filters.quantity.toLowerCase())) {
      return false;
    }
    
    if (searchQuery && !donation.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'nearest':
        return 0; // Would implement actual distance sorting
      case 'quantity':
        return parseInt(b.quantity) - parseInt(a.quantity);
      case 'latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleReservation = (reservationData: ReservationData) => {
    setDonations(prev => prev.map(donation => 
      donation.id === reservationData.foodId 
        ? { ...donation, status: 'reserved' as const, reservedBy: reservationData.contactName }
        : donation
    ));
    setSelectedDonation(null);
    alert('Reservation confirmed! You will receive pickup details shortly.');
  };

  const selectedDonationData = donations.find(d => d.id === selectedDonation);

  return (
    <Layout currentPage="browse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Available Food</h1>
          <p className="text-gray-600">Find and rescue surplus food in your area</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Location */}
            <button className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700">Current Location</span>
            </button>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden flex items-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`hidden lg:block transition-all duration-300 ${isFilterMinimized ? 'w-16' : 'w-80'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              isOpen={true}
              onClose={() => {}}
              isMinimized={isFilterMinimized}
              onToggleMinimize={() => setIsFilterMinimized(!isFilterMinimized)}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            isMinimized={false}
            onToggleMinimize={() => {}}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredDonations.length} food donations found
              </p>
              
              {/* Active Filters */}
              <div className="flex items-center space-x-2">
                {filters.foodType !== 'all' && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {filters.foodType === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                  </span>
                )}
                {filters.urgentOnly && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                    Urgent Only
                  </span>
                )}
                {filters.quantity && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Min: {filters.quantity}
                  </span>
                )}
              </div>
            </div>

            {/* Food Grid */}
            {filteredDonations.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDonations.map((donation) => (
                  <FoodCard
                    key={donation.id}
                    donation={donation}
                    onReserve={(id) => setSelectedDonation(id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No food donations found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search in a different area
                </p>
                <button
                  onClick={() => setFilters({
                    foodType: 'all',
                    distance: 10,
                    quantity: '',
                    urgentOnly: false,
                    sortBy: 'latest',
                  })}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reservation Modal */}
        {selectedDonation && selectedDonationData && (
          <ReservationModal
            donation={selectedDonationData}
            isOpen={true}
            onClose={() => setSelectedDonation(null)}
            onConfirm={handleReservation}
          />
        )}
      </div>
    </Layout>
  );
};

export default BrowseFoodPage;