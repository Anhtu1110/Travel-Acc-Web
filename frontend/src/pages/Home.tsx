import React from 'react';
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import AdvertisementBanner from "../components/AdvertisementBanner";

// Import the image if it's inside the src/assets folder
import bannerImage from '../assets/bner.jpg'; 
import bannerImage1 from '../assets/bn1.jpg'; 

const Home: React.FC = () => {
  const { data: hotels, isLoading, isError } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  if (isLoading) {
    return <div>Loading...</div>; // Add a loading state
  }

  if (isError) {
    return <div>Error loading hotels.</div>; // Add an error state
  }

  return (
    <div className="space-y-6">
      <AdvertisementBanner
        imageUrl={bannerImage} // Ensure the image path is correct
        title="Special Offer!"
        description="Book now and get 20% off your first stay!"
        link="/deals"
      />
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p className="text-gray-600">Most recent destinations added by our hosts</p>
      
      {/* Latest Destination Cards */}
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>

      {/* Second Advertisement Banner */}
      <AdvertisementBanner
        imageUrl={bannerImage1} // Imported banner image
        title="Explore New Destinations!"
        description="Discover our latest additions with exclusive deals."
        link="/new-destinations"
      />
    </div>
  );
};

export default Home;

