import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  AlertTriangle, 
  User,
  Package,
  ExternalLink,
  Heart
} from 'lucide-react';
import { FoodDonation } from '../types';

interface FoodCardProps {
  donation: FoodDonation;
  onReserve: (id: string) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ donation, onReserve }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const expiry = new Date(donation.expiryTime).getTime();
      const difference = expiry - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${hours}h ${minutes}m`);
        setIsUrgent(hours < 2);
      } else {
        setTimeLeft('Expired');
        setIsUrgent(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [donation.expiryTime]);

  const getMealTypeColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return 'bg-yellow-100 text-yellow-800';
      case 'lunch': return 'bg-green-100 text-green-800';
      case 'dinner': return 'bg-purple-100 text-purple-800';
      case 'snacks': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {donation.images.length > 0 ? (
          <img
            src={donation.images[0]}
            alt="Food"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        {donation.status === 'reserved' && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Reserved
          </div>
        )}
        
        {/* Urgency Badge */}
        {isUrgent && donation.status === 'available' && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <AlertTriangle className="w-3 h-3 mr-1" />
            URGENT
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center mb-2">
              <User className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">
                {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                donation.foodType === 'veg' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {donation.foodType === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(donation.mealType)}`}>
                {donation.mealType.charAt(0).toUpperCase() + donation.mealType.slice(1)}
              </span>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <span className="text-lg font-semibold text-gray-800">{donation.quantity}</span>
        </div>

        {/* Expiry Countdown */}
        <div className="flex items-center mb-4">
          <Clock className="w-4 h-4 text-gray-500 mr-2" />
          <span className={`text-sm ${isUrgent ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
            Expires in: {timeLeft}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-start mb-4">
          <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-gray-600">{donation.location}</p>
            {donation.locationLabel && (
              <p className="text-xs text-gray-500 mt-1">{donation.locationLabel}</p>
            )}
            <button className="text-blue-600 hover:text-blue-700 text-xs mt-1 flex items-center">
              View on map
              <ExternalLink className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>

        {/* Packaging Status */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 text-xs">
            {donation.packagingStatus.readyToHandOver && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ready
              </div>
            )}
            {donation.packagingStatus.packedHygienically && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Hygienic
              </div>
            )}
            {donation.packagingStatus.disposableContainers && (
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-3 h-3 mr-1" />
                Containers
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        {donation.status === 'available' ? (
          <button
            onClick={() => onReserve(donation.id)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            🍽️ Claim This Meal
          </button>
        ) : donation.status === 'reserved' ? (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-500 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
          >
            Reserved by {donation.reservedBy}
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
          >
            ✅ Collected
          </button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;