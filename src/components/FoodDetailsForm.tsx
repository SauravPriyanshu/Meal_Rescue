import React, { useState, useRef } from 'react';
import { 
  Upload, 
  MapPin, 
  Clock, 
  Camera, 
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Utensils,
  Package
} from 'lucide-react';

interface FormData {
  foodType: 'cooked' | 'uncooked' | 'raw' | '';
  quantity: string;
  isVeg: boolean | null;
  images: File[];
  pickupTimeFrom: string;
  pickupTimeTo: string;
  bestBefore: string;
  location: string;
  locationLabel: string;
  readyToHandOver: boolean;
  packedHygienically: boolean;
  disposableContainers: boolean;
  consent: boolean;
}

const FoodDetailsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    foodType: '',
    quantity: '',
    isVeg: null,
    images: [],
    pickupTimeFrom: '',
    pickupTimeTo: '',
    bestBefore: '',
    location: '',
    locationLabel: '',
    readyToHandOver: false,
    packedHygienically: false,
    disposableContainers: false,
    consent: false,
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      handleInputChange('images', [...formData.images, ...files]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleInputChange('images', [...formData.images, ...files]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    handleInputChange('images', newImages);
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleInputChange('location', `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          alert('Unable to detect location. Please enter manually.');
        }
      );
    }
  };

  const isUrgent = () => {
    if (!formData.bestBefore) return false;
    const bestBefore = new Date(`${new Date().toDateString()} ${formData.bestBefore}`);
    const now = new Date();
    const timeDiff = bestBefore.getTime() - now.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff <= 2 && hoursDiff > 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSubmission = () => {
    console.log('Form submitted:', formData);
    setShowConfirmModal(false);
    alert('Food rescue request submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Food Details</h1>
          <p className="text-gray-600">Help rescue food and reduce waste by sharing donation details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type of Food */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Utensils className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Type of Food</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['cooked', 'uncooked', 'raw'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleInputChange('foodType', type)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.foodType === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  {type === 'raw' && <span className="block text-xs mt-1">Ingredients</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Veg/Non-Veg */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quantity</h3>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="e.g., 15 meals or 5 kg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-2">Specify approximate quantity or number of servings</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Food Type</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('isVeg', true)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.isVeg === true
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  🌱 Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('isVeg', false)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.isVeg === false
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  🍖 Non-Veg
                </button>
              </div>
            </div>
          </div>

          {/* Upload Images */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Camera className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">Upload Food Images</h3>
              </div>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                Optional but Recommended
              </span>
            </div>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop images here, or</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                browse files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {formData.images.map((file, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Food ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-500 mt-3">
              Upload real images of food/containers. Helps NGOs assess suitability.
            </p>
          </div>

          {/* Pickup Time Window */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Pickup Time Window</h3>
              {isUrgent() && (
                <span className="ml-auto bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  URGENT
                </span>
              )}
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <input
                  type="time"
                  value={formData.pickupTimeFrom}
                  onChange={(e) => handleInputChange('pickupTimeFrom', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <input
                  type="time"
                  value={formData.pickupTimeTo}
                  onChange={(e) => handleInputChange('pickupTimeTo', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Best Before</label>
                <input
                  type="time"
                  value={formData.bestBefore}
                  onChange={(e) => handleInputChange('bestBefore', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Pickup Location */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Pickup Location</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter address or coordinates"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={detectLocation}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  📍 GPS
                </button>
              </div>
              
              <input
                type="text"
                value={formData.locationLabel}
                onChange={(e) => handleInputChange('locationLabel', e.target.value)}
                placeholder="Custom label (e.g., 'Back Gate', 'Kitchen Entrance')"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Packaging Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <Package className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Packaging Status</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { key: 'readyToHandOver', label: 'Ready to hand over?' },
                { key: 'packedHygienically', label: 'Packed hygienically?' },
                { key: 'disposableContainers', label: 'Disposable containers provided?' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[key as keyof FormData] as boolean}
                    onChange={(e) => handleInputChange(key, e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mr-3 transition-colors ${
                    formData[key as keyof FormData]
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    {formData[key as keyof FormData] && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Consent & Declaration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Consent & Hygiene Declaration</h3>
            
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => handleInputChange('consent', e.target.checked)}
                className="sr-only"
                required
              />
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mr-3 mt-0.5 transition-colors ${
                formData.consent
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                {formData.consent && (
                  <CheckCircle className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <span className="text-gray-700">
                  I confirm the food is safe to eat and not stale/spoiled
                </span>
                <div className="mt-2">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
                  >
                    Read FSSAI Food Donation Guidelines
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🚀 Rescue This Food
          </button>
        </form>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Submission</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to submit this food rescue request? NGOs will be notified and may contact you for pickup.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSubmission}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetailsForm;