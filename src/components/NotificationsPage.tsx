import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  X, 
  Clock, 
  Heart, 
  Package, 
  MapPin, 
  User, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Filter,
  MoreVertical
} from 'lucide-react';
import Layout from './Layout';

interface Notification {
  id: string;
  type: 'reservation' | 'donation' | 'pickup' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  actionRequired?: boolean;
  relatedId?: string;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reservation',
      title: 'New Reservation Request',
      message: 'Hope Foundation wants to reserve your 15 meal donation from Green Valley Restaurant',
      timestamp: '2 minutes ago',
      isRead: false,
      priority: 'high',
      actionRequired: true,
      relatedId: 'donation-123',
    },
    {
      id: '2',
      type: 'pickup',
      title: 'Pickup Reminder',
      message: 'Your reserved meals from Community Kitchen are ready for pickup. Expires in 1 hour.',
      timestamp: '15 minutes ago',
      isRead: false,
      priority: 'high',
      actionRequired: true,
      relatedId: 'reservation-456',
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Achievement Unlocked! 🏆',
      message: 'Congratulations! You\'ve earned the "Week Warrior" badge for rescuing food 7 days in a row.',
      timestamp: '1 hour ago',
      isRead: false,
      priority: 'medium',
    },
    {
      id: '4',
      type: 'donation',
      title: 'Donation Confirmed',
      message: 'Your 25 meal donation has been successfully listed and is now available for NGOs.',
      timestamp: '2 hours ago',
      isRead: true,
      priority: 'medium',
    },
    {
      id: '5',
      type: 'system',
      title: 'Weekly Impact Report',
      message: 'This week you helped rescue 12 meals and prevented 24kg of food waste. Great job!',
      timestamp: '1 day ago',
      isRead: true,
      priority: 'low',
    },
    {
      id: '6',
      type: 'pickup',
      title: 'Pickup Completed',
      message: 'Thank you! Your pickup from Anonymous Donor has been marked as completed.',
      timestamp: '2 days ago',
      isRead: true,
      priority: 'low',
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'actionRequired'>('all');

  const getNotificationIcon = (type: string, priority: string) => {
    const iconClass = priority === 'high' ? 'text-red-500' : priority === 'medium' ? 'text-orange-500' : 'text-gray-500';
    
    switch (type) {
      case 'reservation': return <Package className={`w-5 h-5 ${iconClass}`} />;
      case 'donation': return <Heart className={`w-5 h-5 ${iconClass}`} />;
      case 'pickup': return <MapPin className={`w-5 h-5 ${iconClass}`} />;
      case 'achievement': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'system': return <Bell className={`w-5 h-5 ${iconClass}`} />;
      default: return <Bell className={`w-5 h-5 ${iconClass}`} />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return !notif.isRead;
      case 'actionRequired': return notif.actionRequired;
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired).length;

  return (
    <Layout currentPage="notifications">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with your food rescue activities</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark all read
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                filter === 'unread'
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('actionRequired')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                filter === 'actionRequired'
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Action Required ({actionRequiredCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md ${
                  notification.isRead ? 'border-gray-100' : 'border-orange-200 bg-orange-50'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    {/* Icon */}
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        notification.isRead ? 'bg-gray-100' : 'bg-white'
                      }`}>
                        {getNotificationIcon(notification.type, notification.priority)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h3 className={`text-sm font-semibold ${
                              notification.isRead ? 'text-gray-800' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                            {notification.actionRequired && (
                              <span className="ml-2 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                                Action Required
                              </span>
                            )}
                            {!notification.isRead && (
                              <div className="ml-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                          </div>
                          <p className={`text-sm ${
                            notification.isRead ? 'text-gray-600' : 'text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {notification.timestamp}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {notification.actionRequired && (
                        <div className="flex space-x-3 mt-4">
                          {notification.type === 'reservation' && (
                            <>
                              <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                                Approve
                              </button>
                              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                                Decline
                              </button>
                            </>
                          )}
                          {notification.type === 'pickup' && (
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                              View Pickup Details
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : filter === 'actionRequired'
                  ? "No actions required at the moment."
                  : "You don't have any notifications yet."
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'New reservations', description: 'When someone wants to reserve your donation' },
              { label: 'Pickup reminders', description: 'Reminders about upcoming pickups' },
              { label: 'Achievement notifications', description: 'When you earn new badges or milestones' },
              { label: 'Weekly reports', description: 'Summary of your weekly impact' },
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-800">{setting.label}</h4>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsPage;