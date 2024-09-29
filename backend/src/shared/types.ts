// Định nghĩa kiểu dữ liệu UserType
export type UserType = {
  _id: string;
  email: string;
  password: string;
  type: "personal" | "business"; // Thêm trường 'type' để phân biệt personal và business
  firstName?: string; // Optional nếu user là business
  lastName?: string; // Optional nếu user là business
  businessName?: string; // Optional nếu user là personal
  businessPhone?: string; // Optional nếu user là personal
  businessAddress?: string; // Optional nếu user là personal
  businessRegistrationNumber?: string; // Optional nếu user là personal
  representativeName?: string; // Optional nếu user là personal
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
