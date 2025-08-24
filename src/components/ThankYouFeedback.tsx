import React, { useState } from 'react';
import { Star, Download, Heart, MessageCircle } from 'lucide-react';
import Layout from './Layout';
import { FoodDonation } from '../types';

interface ThankYouFeedbackProps {
  donation: FoodDonation;
  onComplete: () => void;
}

interface FeedbackData {
  foodQuality: number;
  packaging: number;
  timeliness: number;
  comments: string;
}

const ThankYouFeedback: React.FC<ThankYouFeedbackProps> = ({
  donation,
  onComplete,
}) => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    foodQuality: 0,
    packaging: 0,
    timeliness: 0,
    comments: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStarClick = (category: keyof Omit<FeedbackData, 'comments'>, rating: number) => {
    setFeedback(prev => ({ ...prev, [category]: rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
  };

  const downloadCertificate = () => {
    // In a real app, this would generate and download a PDF certificate
    alert('Certificate download would start here!');
  };

  const StarRating: React.FC<{
    rating: number;
    onRate: (rating: number) => void;
    label: string;
  }> = ({ rating, onRate, label }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="transition-colors"
          >
            <Star
              className={`w-6 h-6 ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <Layout currentPage="my-reservations">
        <div className="max-w-2xl mx-auto py-16 px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            {/* Success Animation */}
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🎉 Thank You for Helping Reduce Food Waste!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Your feedback helps us improve the food rescue experience for everyone.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">1</div>
                <div className="text-sm text-green-700">Meal Rescued</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">~2kg</div>
                <div className="text-sm text-blue-700">CO₂ Saved</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">1</div>
                <div className="text-sm text-orange-700">Life Impacted</div>
              </div>
            </div>

            {/* Certificate */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-xl mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🏆 Food Rescue Certificate
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                You've earned a certificate for your contribution to reducing food waste!
              </p>
              <button
                onClick={downloadCertificate}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </button>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Continue Rescuing Food
              </button>
              
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                Share Your Experience
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPage="my-reservations">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">How Was Your Experience?</h1>
          <p className="text-gray-600">Your feedback helps us improve the food rescue process</p>
        </div>

        {/* Food Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Rescued Food</h3>
          
          <div className="flex items-center space-x-4">
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
                From: {donation.isAnonymous ? 'Anonymous Donor' : donation.donorName}
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
        </div>

        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Rate Your Experience</h3>
            
            <div className="space-y-6">
              <StarRating
                rating={feedback.foodQuality}
                onRate={(rating) => handleStarClick('foodQuality', rating)}
                label="Food Quality"
              />
              
              <StarRating
                rating={feedback.packaging}
                onRate={(rating) => handleStarClick('packaging', rating)}
                label="Packaging & Hygiene"
              />
              
              <StarRating
                rating={feedback.timeliness}
                onRate={(rating) => handleStarClick('timeliness', rating)}
                label="Timeliness & Coordination"
              />
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Additional Comments</h3>
            </div>
            
            <textarea
              value={feedback.comments}
              onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
              placeholder="Share any additional thoughts about your food rescue experience..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Submit Feedback
          </button>
        </form>

        {/* Encouragement */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mt-6">
          <div className="text-center">
            <h4 className="font-semibold text-gray-800 mb-2">
              🌍 You Made a Difference!
            </h4>
            <p className="text-sm text-gray-600">
              By rescuing this food, you've helped reduce waste and supported someone in need. 
              Every meal counts in building a more sustainable future.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYouFeedback;