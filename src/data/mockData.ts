import { FoodDonation } from '../types';

export const mockFoodDonations: FoodDonation[] = [
  {
    id: '1',
    donorName: 'Green Valley Restaurant',
    isAnonymous: false,
    foodType: 'veg',
    mealType: 'lunch',
    quantity: '25 meals',
    expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    location: '123 Main Street, Downtown',
    locationLabel: 'Kitchen Back Door',
    packagingStatus: {
      readyToHandOver: true,
      packedHygienically: true,
      disposableContainers: true,
    },
    images: ['https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'],
    status: 'available',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    donorName: 'Anonymous',
    isAnonymous: true,
    foodType: 'non-veg',
    mealType: 'dinner',
    quantity: '10 meals',
    expiryTime: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45 minutes from now
    location: '456 Oak Avenue, Midtown',
    locationLabel: 'Front Reception',
    packagingStatus: {
      readyToHandOver: true,
      packedHygienically: true,
      disposableContainers: false,
    },
    images: ['https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg'],
    status: 'available',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    donorName: 'Community Kitchen',
    isAnonymous: false,
    foodType: 'veg',
    mealType: 'breakfast',
    quantity: '15 meals',
    expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    location: '789 Pine Street, Uptown',
    locationLabel: 'Side Entrance',
    packagingStatus: {
      readyToHandOver: true,
      packedHygienically: true,
      disposableContainers: true,
    },
    images: ['https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg'],
    status: 'reserved',
    reservedBy: 'Hope Foundation',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
];