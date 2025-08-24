import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Heart, 
  Package, 
  Users, 
  Calendar,
  Star,
  Crown,
  Target,
  Zap
} from 'lucide-react';
import Layout from './Layout';

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  mealsRescued: number;
  mealsDonated: number;
  impactScore: number;
  streak: number;
  rank: number;
  badge: string;
  isCurrentUser?: boolean;
}

const LeaderboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');
  const [category, setCategory] = useState<'overall' | 'donors' | 'rescuers'>('overall');

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: '1',
      name: 'Green Valley Restaurant',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      mealsRescued: 0,
      mealsDonated: 342,
      impactScore: 2840,
      streak: 28,
      rank: 1,
      badge: 'Food Hero',
      isCurrentUser: false,
    },
    {
      id: '2',
      name: 'Hope Foundation',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      mealsRescued: 298,
      mealsDonated: 0,
      impactScore: 2650,
      streak: 21,
      rank: 2,
      badge: 'Rescue Champion',
      isCurrentUser: false,
    },
    {
      id: '3',
      name: 'Community Kitchen',
      avatar: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      mealsRescued: 156,
      mealsDonated: 189,
      impactScore: 2420,
      streak: 15,
      rank: 3,
      badge: 'Impact Leader',
      isCurrentUser: false,
    },
    {
      id: '4',
      name: 'You',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      mealsRescued: 23,
      mealsDonated: 47,
      impactScore: 892,
      streak: 7,
      rank: 12,
      badge: 'Rising Star',
      isCurrentUser: true,
    },
  ];

  const achievements = [
    { title: 'First Rescue', description: 'Complete your first food rescue', icon: Package, earned: true },
    { title: 'Week Warrior', description: 'Rescue food for 7 consecutive days', icon: Calendar, earned: true },
    { title: 'Century Club', description: 'Rescue 100 meals', icon: Trophy, earned: false },
    { title: 'Impact Master', description: 'Reach 1000 impact score', icon: Target, earned: false },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Food Hero': return 'bg-yellow-100 text-yellow-800';
      case 'Rescue Champion': return 'bg-blue-100 text-blue-800';
      case 'Impact Leader': return 'bg-purple-100 text-purple-800';
      case 'Rising Star': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout currentPage="leaderboard">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">🏆 Leaderboard</h1>
          <p className="text-gray-600">Celebrating our food rescue heroes and their impact</p>
        </div>

        {/* Time Period Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-center">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'weekly', label: 'This Week' },
                { key: 'monthly', label: 'This Month' },
                { key: 'allTime', label: 'All Time' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex space-x-4 mb-6">
              {[
                { key: 'overall', label: 'Overall', icon: Trophy },
                { key: 'donors', label: 'Top Donors', icon: Heart },
                { key: 'rescuers', label: 'Top Rescuers', icon: Package },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key as any)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    category === cat.key
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <cat.icon className="w-4 h-4 mr-2" />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Leaderboard List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Rankings</h3>
                <div className="space-y-4">
                  {leaderboardData.map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center p-4 rounded-lg transition-colors ${
                        entry.isCurrentUser 
                          ? 'bg-gradient-to-r from-orange-50 to-blue-50 border-2 border-orange-200' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-12 h-12 mr-4">
                        {getRankIcon(entry.rank)}
                      </div>

                      {/* Avatar */}
                      <div className="relative mr-4">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {entry.rank <= 3 && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-semibold text-gray-800 mr-2">{entry.name}</h4>
                          {entry.isCurrentUser && (
                            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              You
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1 text-red-500" />
                            {entry.mealsDonated} donated
                          </span>
                          <span className="flex items-center">
                            <Package className="w-3 h-3 mr-1 text-green-500" />
                            {entry.mealsRescued} rescued
                          </span>
                          <span className="flex items-center">
                            <Zap className="w-3 h-3 mr-1 text-orange-500" />
                            {entry.streak} day streak
                          </span>
                        </div>
                      </div>

                      {/* Badge & Score */}
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1 ${getBadgeColor(entry.badge)}`}>
                          {entry.badge}
                        </div>
                        <div className="text-lg font-bold text-gray-800">{entry.impactScore}</div>
                        <div className="text-xs text-gray-500">impact score</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Rank</span>
                  <span className="text-lg font-bold text-orange-600">#12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Impact Score</span>
                  <span className="text-lg font-bold text-gray-800">892</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm font-medium text-green-600">+127 points</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-xs text-gray-500 mb-1">Next Rank Progress</div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">108 points to rank #11</div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${
                    achievement.earned ? 'bg-gradient-to-r from-green-50 to-blue-50' : 'bg-gray-50'
                  }`}>
                    <achievement.icon className={`w-5 h-5 mr-3 ${
                      achievement.earned ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <div className="flex-1">
                      <h4 className={`font-medium text-sm ${
                        achievement.earned ? 'text-gray-800' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-xs ${
                        achievement.earned ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Challenge */}
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Weekly Challenge</h3>
              <p className="text-sm text-orange-100 mb-4">
                Rescue 5 meals this week to earn the "Week Warrior" badge!
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>2/5 meals</span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeaderboardPage;