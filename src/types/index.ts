export interface FoodDonation {
  id: string;
  donorName: string;
  isAnonymous: boolean;
  foodType: 'veg' | 'non-veg';
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
  quantity: string;
  expiryTime: string;
  location: string;
  locationLabel?: string;
  packagingStatus: {
    readyToHandOver: boolean;
    packedHygienically: boolean;
    disposableContainers: boolean;
  };
  images: string[];
  status: 'available' | 'reserved' | 'collected';
  reservedBy?: string;
  createdAt: string;
}

export interface FilterState {
  foodType: 'all' | 'veg' | 'non-veg';
  distance: number;
  quantity: string;
  urgentOnly: boolean;
  sortBy: 'nearest' | 'quantity' | 'latest';
}

export interface ReservationData {
  foodId: string;
  message: string;
  pickupType: 'self' | 'delivery';
  preferredTime: string;
  contactName: string;
  contactPhone: string;
}