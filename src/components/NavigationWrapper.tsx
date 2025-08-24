import React, { useState } from 'react';
import HomePage from './HomePage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import FoodDetailsForm from './FoodDetailsForm';
import BrowseFoodPage from './BrowseFoodPage';
import DashboardPage from './DashboardPage';
import ProfilePage from './ProfilePage';
import InteractiveMapPage from './InteractiveMapPage';
import LeaderboardPage from './LeaderboardPage';
import NotificationsPage from './NotificationsPage';

type PageType = 'home' | 'signup' | 'login' | 'food-details' | 'take' | 'give' | 'dashboard' | 'profile' | 'map' | 'leaderboard' | 'notifications';

const NavigationWrapper: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignupPage />;
      case 'login':
        return <LoginPage />;
      case 'food-details':
      case 'give':
        return <FoodDetailsForm />;
      case 'take':
        return <BrowseFoodPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'map':
        return <InteractiveMapPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MEAL RESCUE</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'home' ? 'bg-orange-500' : 'hover:bg-blue-800'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'dashboard' ? 'bg-orange-500' : 'hover:bg-blue-800'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('leaderboard')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'leaderboard' ? 'bg-orange-500' : 'hover:bg-blue-800'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setCurrentPage('notifications')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'notifications' ? 'bg-orange-500' : 'hover:bg-blue-800'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setCurrentPage('profile')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'profile' ? 'bg-orange-500' : 'hover:bg-blue-800'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setCurrentPage('signup')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'signup' ? 'bg-orange-500' : 'hover:bg-blue-800'
              }`}
            >
              Signup
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === 'login' ? 'bg-orange-500' : 'hover:bg-blue-800'
              }`}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      
      {/* Page Content */}
      {renderPage()}
    </div>
  );
};

export default NavigationWrapper;