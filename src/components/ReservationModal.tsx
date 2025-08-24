import React, { useState } from 'react';
import { X, MessageCircle, Clock, User, Phone } from 'lucide-react';
import { FoodDonation, ReservationData } from '../types';

interface ReservationModalProps {
  donation: FoodDonation;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: ReservationData) => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  donation,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [formData, setFormData] = useState<Omit<ReservationData, 'foodId'>>({
    message: '',
    pickupType: 'self',
    preferredTime: '',
    contactName: '',
    contactPhone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      ...formData,
      foodId: donation.id,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Reserve This Meal</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Food Summary */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {donation.images.length > 0 && (
              <img
                src={donation.images[0]}
                alt="Food"
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div>
              <h4 className="font-semibold text-gray-800">{donation.quantity}</h4>
              <p className="text-sm text-gray-600">
                {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
              </p>
              <p className="text-xs text-gray-500">{donation.location}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Message */}
          <div>
            <div className="flex items-center mb-3">
              <MessageCircle className="w-4 h-4 text-blue-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Message to Donor (Optional)
              </label>
            </div>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Let the donor know why you need this food..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Pickup Type */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Pickup Method</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, pickupType: 'self' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.pickupType === 'self'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                🚶 Self Pickup
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, pickupType: 'delivery' })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.pickupType === 'delivery'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                🚚 Request Delivery
              </button>
            </div>
          </div>

          {/* Preferred Time */}
          <div>
            <div className="flex items-center mb-3">
              <Clock className="w-4 h-4 text-blue-600 mr-2" />
              <label className="text-sm font-medium text-gray-700">
                Preferred Pickup Time
              </label>
            </div>
            <input
              type="time"
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Contact Information</h4>
            
            <div>
              <div className="flex items-center mb-2">
                <User className="w-4 h-4 text-blue-600 mr-2" />
                <label className="text-sm font-medium text-gray-700">Contact Name</label>
              </div>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Your name or organization"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Phone className="w-4 h-4 text-blue-600 mr-2" />
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
              </div>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;