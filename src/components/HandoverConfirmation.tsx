import React, { useState, useEffect } from 'react';
import { QrCode, Hash, CheckCircle, Clock, RefreshCw, Shield } from 'lucide-react';
import Layout from './Layout';
import { FoodDonation } from '../types';

interface HandoverConfirmationProps {
  donation: FoodDonation;
  onComplete: () => void;
}

const HandoverConfirmation: React.FC<HandoverConfirmationProps> = ({
  donation,
  onComplete,
}) => {
  const [otp, setOtp] = useState('');
  const [generatedOtp] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'generate' | 'verify'>('generate');
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setIsVerified(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      alert('Invalid OTP. Please try again.');
      setOtp('');
    }
  };

  const sendOtpToDonor = () => {
    // Simulate sending OTP to donor
    setOtpSent(true);
    setVerificationStep('verify');
    alert(`OTP ${generatedOtp} has been sent to the donor's phone.`);
  };

  const regenerateOtp = () => {
    // In real implementation, this would generate a new OTP
    setOtpSent(false);
    setVerificationStep('generate');
    setOtp('');
    setTimeLeft(300);
  };

  const generateQRData = () => {
    return JSON.stringify({
      donationId: donation.id,
      otp: generatedOtp,
      timestamp: Date.now(),
    });
  };

  if (isVerified) {
    return (
      <Layout currentPage="my-reservations">
        <div className="max-w-md mx-auto py-16 px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Handover Successful! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              The food has been successfully collected. Thank you for helping reduce food waste!
            </p>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700">
                This meal rescue has been completed and recorded in our system.
              </p>
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Handover Confirmation</h1>
          <p className="text-gray-600">Complete the food handover process</p>
        </div>

        {/* Food Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Food Details</h3>
          
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
        </div>

        {/* Verification Methods */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* QR Code Method */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <QrCode className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">QR Code</h3>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Ask the donor to scan this QR code with their phone
              </p>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700">
                  QR Code contains: {generateQRData().substring(0, 30)}...
                </p>
              </div>
            <p className="text-gray-600">Verify your identity to complete the food handover</p>
          )}
                >
                  Send Verification Code to Donor
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Verify OTP */
            <div className="space-y-6 mb-8">
              {/* OTP Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-800">Code Sent Successfully</h3>
                  </div>
                Complete verification using the sent code or QR scan
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Expires in {formatTime(timeLeft)}</span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">
                    ✅ Verification code <strong>{generatedOtp}</strong> has been sent to the donor's phone.
                    Ask them to confirm the code to complete the handover.
                  </p>
                </div>
              </div>
          </div>
        </div>
              {/* Manual Verification */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Manual Verification</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If the donor confirms the code verbally, you can enter it here to complete the handover:
                </p>
                
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-wider"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={regenerateOtp}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Code
                    </button>
                    <button
                      type="submit"
                      disabled={otp.length !== 6}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Verify & Complete
                    </button>
                  </div>
                </form>
              </div>

              {/* Alternative QR Method */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center mb-4">
                  <QrCode className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Alternative: QR Code</h3>
                </div>
                
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Ask the donor to scan this QR code with their phone camera
                Enter OTP
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-700">
                      QR Code contains verification data for instant confirmation
                    </p>
                  </div>
              </label>
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all"
            >
              Verify & Complete Handover
            </button>
          </form>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h4 className="font-semibold text-blue-800 mb-3">Handover Instructions</h4>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Meet the donor at the specified location
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Verify the food quality and packaging
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Complete verification using QR code or OTP
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Thank the donor for their contribution
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default HandoverConfirmation;