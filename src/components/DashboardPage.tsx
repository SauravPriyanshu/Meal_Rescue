import React, { useState } from 'react';
import { 
  Heart, 
  Package, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Users, 
  Award,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import Layout from './Layout';
import { mockFoodDonations } from '../data/mockData';

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'donations' | 'reservations'>('overview');

  const stats = [
    { label: 'Meals Donated', value: '47', icon: Heart, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Meals Rescued', value: '23', icon: Package, color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Active Listings', value: '5', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Impact Score', value: '892', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const recentActivity = [
    { id: 1, action: 'Donated 15 meals', location: 'Green Valley Restaurant', time: '2 hours ago', status: 'completed' },
    { id: 2, action: 'Reserved 10 meals', location: 'Community Kitchen', time: '5 hours ago', status: 'pending' },
    { id: 3, action: 'Donated 8 meals', location: 'Anonymous', time: '1 day ago', status: 'completed' },
    { id: 4, action: 'Reserved 12 meals', location: 'Hope Foundation', time: '2 days ago', status: 'completed' },
  ];

  const myDonations = mockFoodDonations.slice(0, 3);
  const myReservations = mockFoodDonations.slice(1, 4);

  return (
    <Layout currentPage="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your food rescue impact and manage your activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'overview', label: 'Overview', icon: TrendingUp },
                { key: 'donations', label: 'My Donations', icon: Heart },
                { key: 'reservations', label: 'My Reservations', icon: Package },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            activity.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                          }`} />
                          <div>
                            <p className="font-medium text-gray-800">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{activity.time}</p>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            activity.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {activity.status === 'completed' ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <Clock className="w-3 h-3 mr-1" />
                            )}
                            {activity.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Impact This Month</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">70</div>
                      <div className="text-sm text-gray-600">Total Meals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">~140kg</div>
                      <div className="text-sm text-gray-600">CO₂ Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">35</div>
                      <div className="text-sm text-gray-600">Lives Impacted</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'donations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">My Food Donations</h3>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    + Add New Donation
                  </button>
                </div>
                
                <div className="space-y-4">
                  {myDonations.map((donation) => (
                    <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
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
                            <p className="text-sm text-gray-600">{donation.location}</p>
                            <div className="flex items-center mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                donation.status === 'available' 
                                  ? 'bg-green-100 text-green-800'
                                  : donation.status === 'reserved'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {donation.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-green-600 transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reservations' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">My Reservations</h3>
                
                <div className="space-y-4">
                  {myReservations.map((reservation) => (
                    <div key={reservation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {reservation.images.length > 0 && (
                            <img
                              src={reservation.images[0]}
                              alt="Food"
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-800">{reservation.quantity}</h4>
                            <p className="text-sm text-gray-600">
                              From: {reservation.isAnonymous ? 'Anonymous' : reservation.donorName}
                            </p>
                            <p className="text-sm text-gray-600">{reservation.location}</p>
                            <div className="flex items-center mt-1">
                              <Clock className="w-3 h-3 text-gray-500 mr-1" />
                              <span className="text-xs text-gray-500">
                                Pickup by: {new Date(reservation.expiryTime).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            reservation.status === 'reserved'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {reservation.status === 'reserved' ? 'Pending Pickup' : 'Completed'}
                          </span>
                          {reservation.status === 'reserved' && (
                            <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
                              View Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;