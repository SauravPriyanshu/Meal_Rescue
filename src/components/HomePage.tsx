import React from 'react';
import { Heart, Users, MapPin, Clock, ArrowRight, Star, Award, TrendingUp } from 'lucide-react';
import Layout from './Layout';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const stats = [
    { number: '1,52,004', label: 'Meals Rescued', icon: Heart },
    { number: '2,847', label: 'Active Donors', icon: Users },
    { number: '156', label: 'Partner NGOs', icon: Award },
    { number: '89%', label: 'Success Rate', icon: TrendingUp },
  ];

  const teamMembers = [
    { name: 'MUFAIZUL', role: 'Founder', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
    { name: 'SAURAV', role: 'Co-Founder', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg' },
  ];

  const partners = [
    { name: 'College', type: 'Educational Institution' },
    { name: 'Restaurant', type: 'Food Partner' },
    { name: 'NGO', type: 'Distribution Partner' },
  ];

  return (
    <Layout currentPage="home">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              MEAL RESCUE
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Turning leftovers into lifelines.
            </p>
            <div className="flex items-center justify-center mb-12">
              <span className="text-lg text-blue-200">meal rescued :</span>
              <span className="text-3xl font-bold text-orange-400 ml-2">1,52,004</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button 
              onClick={() => onNavigate('give')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              GIVE
              <div className="text-sm font-normal mt-1">Follow Meal</div>
            </button>
            
            <div className="flex items-center">
              <button 
                onClick={() => onNavigate('map')}
                className="p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
              >
                <MapPin className="w-8 h-8 text-orange-400" />
              </button>
            </div>
            
            <button 
              onClick={() => onNavigate('take')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              TAKE
              <div className="text-sm font-normal mt-1">Find Food</div>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center">
                <stat.icon className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-12">
            <div className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-medium mr-4">
              OUR TEAM
            </div>
            <div className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-medium mr-4">
              MISSION
            </div>
            <div className="bg-blue-900 text-white px-6 py-2 rounded-full text-sm font-medium">
              IMPACT
            </div>
          </div>

          <div className="flex justify-center items-center space-x-12 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                  {member.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-12">PARTNERS & SPONSORS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{partner.name}</h3>
                <p className="text-gray-600">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default HomePage;