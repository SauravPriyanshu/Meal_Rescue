import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Filter, 
  Navigation, 
  Clock, 
  Package, 
  Users, 
  AlertTriangle,
  Eye,
  EyeOff,
  Layers,
  Target,
  Phone,
  MessageCircle,
  ExternalLink,
  X
} from 'lucide-react';
import Layout from './Layout';
import { FoodDonation } from '../types';
import { mockFoodDonations } from '../data/mockData';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'donor' | 'ngo' | 'volunteer';
  data: FoodDonation | any;
  urgency: 'urgent' | 'normal' | 'expired';
}

interface FilterState {
  distance: number;
  mealType: string[];
  foodType: 'all' | 'veg' | 'non-veg';
  timeLeft: string;
  quantity: number;
  urgencyOnly: boolean;
}

const InteractiveMapPage: React.FC = () => {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [userLocation, setUserLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [filters, setFilters] = useState<FilterState>({
    distance: 5,
    mealType: [],
    foodType: 'all',
    timeLeft: 'all',
    quantity: 0,
    urgencyOnly: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [mapView, setMapView] = useState<'normal' | 'heatmap' | 'cluster'>('normal');
  const [privacyMode, setPrivacyMode] = useState(false);

  useEffect(() => {
    // Request location permission and get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }

    // Convert mock data to map markers
    const mapMarkers: MapMarker[] = mockFoodDonations.map((donation, index) => {
      const baseLatLng = [
        { lat: 40.7128, lng: -74.0060 },
        { lat: 40.7589, lng: -73.9851 },
        { lat: 40.6892, lng: -74.0445 },
      ];
      
      const location = baseLatLng[index % baseLatLng.length];
      const randomOffset = () => (Math.random() - 0.5) * 0.02;
      
      // Determine urgency based on expiry time
      const expiryTime = new Date(donation.expiryTime);
      const now = new Date();
      const hoursUntilExpiry = (expiryTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      let urgency: 'urgent' | 'normal' | 'expired' = 'normal';
      if (hoursUntilExpiry < 0) urgency = 'expired';
      else if (hoursUntilExpiry < 2) urgency = 'urgent';

      return {
        id: donation.id,
        lat: location.lat + randomOffset(),
        lng: location.lng + randomOffset(),
        type: 'donor' as const,
        data: donation,
        urgency,
      };
    });

    setMarkers(mapMarkers);
  }, []);

  const getMarkerColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-500';
      case 'expired': return 'bg-gray-400';
      default: return 'bg-green-500';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'donor': return '🍽️';
      case 'ngo': return '🏠';
      case 'volunteer': return '🚚';
      default: return '📍';
    }
  };

  const filteredMarkers = markers.filter(marker => {
    if (filters.urgencyOnly && marker.urgency !== 'urgent') return false;
    if (filters.foodType !== 'all' && marker.data.foodType !== filters.foodType) return false;
    return true;
  });

  const handleReserve = (markerId: string) => {
    setMarkers(prev => prev.map(marker => 
      marker.id === markerId 
        ? { ...marker, data: { ...marker.data, status: 'reserved' } }
        : marker
    ));
    setSelectedMarker(null);
    alert('Food reserved successfully!');
  };

  return (
    <Layout currentPage="map">
      <div className="relative h-screen bg-gray-100">
        {/* Map Container */}
        <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gray-200">
            <div className="w-full h-full relative overflow-hidden">
              {/* Grid pattern to simulate map */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-20 grid-rows-20 w-full h-full">
                  {Array.from({ length: 400 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>
              
              {/* User Location */}
              <div 
                className="absolute w-4 h-4 bg-blue-600 rounded-full animate-pulse shadow-lg"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
              </div>

              {/* Map Markers */}
              {filteredMarkers.map((marker) => (
                <div
                  key={marker.id}
                  className={`absolute w-8 h-8 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg hover:scale-110 transition-transform ${getMarkerColor(marker.urgency)}`}
                  style={{
                    left: `${((marker.lng + 74.0060) / 0.1) * 100}%`,
                    top: `${((40.7628 - marker.lat) / 0.1) * 100}%`,
                  }}
                  onClick={() => setSelectedMarker(marker)}
                >
                  <div className="w-full h-full flex items-center justify-center text-white text-sm">
                    {getMarkerIcon(marker.type)}
                  </div>
                  {marker.urgency === 'urgent' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setPrivacyMode(!privacyMode)}
              className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              {privacyMode ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
            </button>
            <button
              onClick={() => setMapView(mapView === 'normal' ? 'heatmap' : 'normal')}
              className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Layers className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-20 right-4 flex flex-col space-y-2">
            <button className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <span className="text-lg font-bold text-gray-600">+</span>
            </button>
            <button className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
              <span className="text-lg font-bold text-gray-600">−</span>
            </button>
          </div>

          {/* Current Location Button */}
          <div className="absolute bottom-4 right-4">
            <button className="bg-blue-600 p-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
              <Target className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Filter Sidebar */}
        {showFilters && (
          <div className="absolute top-0 left-0 w-80 h-full bg-white shadow-xl z-10 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Map Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Distance Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance: {filters.distance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={filters.distance}
                  onChange={(e) => setFilters(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Food Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                <div className="space-y-2">
                  {['all', 'veg', 'non-veg'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="foodType"
                        value={type}
                        checked={filters.foodType === type}
                        onChange={(e) => setFilters(prev => ({ ...prev, foodType: e.target.value as any }))}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Urgency Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.urgencyOnly}
                    onChange={(e) => setFilters(prev => ({ ...prev, urgencyOnly: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Show urgent only</span>
                </label>
              </div>

              {/* Legend */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Legend</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Urgent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Expired</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Marker Detail Modal */}
        {selectedMarker && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Food Details</h3>
                  <button
                    onClick={() => setSelectedMarker(null)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Food Image */}
                {selectedMarker.data.images && selectedMarker.data.images.length > 0 && (
                  <img
                    src={selectedMarker.data.images[0]}
                    alt="Food"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                {/* Food Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Donor:</span>
                    <span className="font-medium text-gray-800">
                      {selectedMarker.data.isAnonymous ? 'Anonymous' : selectedMarker.data.donorName}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="font-medium text-gray-800">{selectedMarker.data.quantity}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMarker.data.foodType === 'veg' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedMarker.data.foodType === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Expires:</span>
                    <span className={`text-sm ${selectedMarker.urgency === 'urgent' ? 'text-red-600 font-medium' : 'text-gray-800'}`}>
                      {new Date(selectedMarker.data.expiryTime).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-start justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <div className="text-right">
                      <p className="text-sm text-gray-800">{selectedMarker.data.location}</p>
                      <button className="text-blue-600 hover:text-blue-700 text-xs mt-1 flex items-center">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open in Maps
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedMarker(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  {selectedMarker.data.status === 'available' ? (
                    <button
                      onClick={() => handleReserve(selectedMarker.id)}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                    >
                      Reserve
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 px-4 py-3 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                    >
                      Reserved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">{filteredMarkers.filter(m => m.urgency === 'normal').length} Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-gray-600">{filteredMarkers.filter(m => m.urgency === 'urgent').length} Urgent</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InteractiveMapPage;