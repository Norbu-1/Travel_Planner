import React, { useEffect, useState } from "react";

const locationData = {
  "Miami": {
    photo: "https://images.pexels.com/photos/4366062/pexels-photo-4366062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "A vibrant city known for its beautiful beaches.",
  },
  "Denver": {
    photo: "https://images.pexels.com/photos/3047493/pexels-photo-3047493.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "A city surrounded by the Rocky Mountains.",
  },
  "New York": {
    photo: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    description: "The city that never sleeps, known for its skyline and culture.",
  },
  "Los Angeles": {
    photo: "https://images.pexels.com/photos/2695679/pexels-photo-2695679.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Famous for Hollywood, beaches, and the entertainment industry.",
  },
  "Chicago": {
    photo: "https://images.pexels.com/photos/1823680/pexels-photo-1823680.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "Known for its stunning architecture and deep-dish pizza.",
  },
  "Houston": {
    photo: "https://images.pexels.com/photos/273204/pexels-photo-273204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
    description: "A large city in Texas known for its space exploration and energy industries.",
  },
  "San Francisco": {
    photo: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Famous for the Golden Gate Bridge, cable cars, and vibrant culture.",
  },
  "Seattle": {
    photo: "https://images.pexels.com/photos/2539436/pexels-photo-2539436.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Known for its coffee culture, tech industry, and beautiful waterfront.",
  },
  "Orlando": {
    photo: "https://images.pexels.com/photos/3411135/pexels-photo-3411135.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Famous for its theme parks, including Walt Disney World.",
  },
  "Las Vegas": {
    photo: "https://images.pexels.com/photos/165799/pexels-photo-165799.jpeg?auto=compress&cs=tinysrgb&w=600", 
    description: "Known for its vibrant nightlife, casinos, and entertainment shows.",
  },
};


export const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (trip) {
      const locationLabel = trip?.userSelection?.location?.label;
      const locationInfo = locationData[locationLabel];
      if (locationInfo) {
        setPhotoUrl(locationInfo.photo);
        setDescription(locationInfo.description);
      }
    }
  }, [trip]);

  return (
    <div>
      <img
        src={photoUrl}
        className="h-[300px] w-full object-cover rounded-xl"
        alt={trip?.userSelection?.location?.label}
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-gray-600">{description}</p> {/* Add description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
            <h2 className="p-1 px-1 md:px-3 bg-gray-200 rounded-full text-gray-500">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🧳 No. Of Traveler: {trip?.userSelection?.traveller}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
