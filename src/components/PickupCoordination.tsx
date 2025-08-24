import React, { useState } from 'react';
import { Clock, User, Phone, MapPin, Package, ArrowRight } from 'lucide-react';
import Layout from './Layout';
import { FoodDonation, ReservationData } from '../types';

interface PickupCoordinationProps {
  donation: FoodDonation;
  reservation: ReservationData;
  onConfirm: () => void;
}

const PickupCoordination: React.FC<PickupCoordinationProps> = ({
  donation,
  reservation,
  onConfirm,
}) => {
  const [eta, setEta] = useState('');

  return (
    <Layout currentPage="my-reservations">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Pickup Coordination</h1>
          <p className="text-gray-600">Coordinate the pickup details with the donor</p>
        </div>

        {/* Reservation Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reservation Summary</h3>
          
          <div className="flex items-center space-x-4 mb-6">
            {donation.images.length > 0 && (
              <img
                src={donation.images[0]}
                alt="Food"
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{donation.quantity}</h4>
              <p className="text-sm text-gray-600">
                {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
              </p>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  donation.foodType === 'veg' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {donation.foodType === 'veg' ? '🌱 Veg' : '🍖 Non-Veg'}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-500 mr-2" />
              <span>Preferred: {reservation.preferredTime}</span>
            </div>
            <div className="flex items-center">
              <Package className="w-4 h-4 text-gray-500 mr-2" />
              <span>{reservation.pickupType === 'self' ? 'Self Pickup' : 'Delivery Requested'}</span>
            </div>
          </div>
        </div>

        {/* Pickup Method Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pickup Method</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border-2 transition-all ${
              reservation.pickupType === 'self'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">🚶</span>
                <h4 className="font-medium text-gray-800">Self Pickup</h4>
              </div>
              <p className="text-sm text-gray-600">
                You will collect the food directly from the donor's location
              </p>
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              reservation.pickupType === 'delivery'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">🚚</span>
                <h4 className="font-medium text-gray-800">Delivery Service</h4>
              </div>
              <p className="text-sm text-gray-600">
                Our logistics partner will deliver the food to your location
              </p>
              {reservation.pickupType === 'delivery' && (
                <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-orange-700">
                    Delivery fee: ₹25 | ETA: 30-45 minutes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ETA Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated Time of Arrival</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When will you arrive for pickup?
              </label>
              <input
                type="time"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-700">
                💡 <strong>Tip:</strong> Please arrive within the agreed time window to ensure food quality and donor convenience.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <User className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">{reservation.contactName}</p>
                <p className="text-sm text-gray-600">Pickup Contact Person</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-800">{reservation.contactPhone}</p>
                <p className="text-sm text-gray-600">Contact Number</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pickup Location</h3>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-gray-500 mr-3 mt-1" />
              <div>
                <p className="font-medium text-gray-800">{donation.location}</p>
                {donation.locationLabel && (
                  <p className="text-sm text-gray-600 mt-1">{donation.locationLabel}</p>
                )}
              </div>
            </div>
            
            <button className="w-full p-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              📍 Open in Maps
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
        >
          Confirm Pickup Details
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </Layout>
  );
};

export default PickupCoordination;