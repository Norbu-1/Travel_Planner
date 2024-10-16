import React from "react";
import { Link } from "react-router-dom";

export const MyTripCard = ({ item }) => {
  const getTotalBudget = () => {
    let totalBudget;
    const budget = item?.userSelection?.budget;

    if (budget === "Cheap") {
      totalBudget = "$500 - $700";
    } else if (budget === "Moderate") {
      totalBudget = "$700 - $1000";
    } else if (budget === "Luxury") {
      totalBudget = "$1000+";
    } else {
      totalBudget = "Not specified"; 
    }
    return totalBudget;
  };

  return (
    <Link to={`/view-trip/${item.id}`}>
      <div className="border rounded-lg hover:scale-105 transition-all hover:shadow-md h-[250px] bg-white">
        <img
          src="https://images.pexels.com/photos/2859169/pexels-photo-2859169.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Trip Preview"
          className="rounded-t-md object-cover w-full h-[130px]"
        />
        <div className="px-4 py-2">
          <h2 className="font-bold text-lg">
            {item?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500 ">
            {item?.userSelection?.noOfDays} Days trip with - {item?.userSelection?.budget} budget{" "}
          </h2>
          <p className="text-sm text-gray-500 "> 
           Traveller: {item?.userSelection?.traveller} 
          </p>
          <p className=" text-sm text-gray-500">
            Budget Range: {getTotalBudget()}
          </p>
        </div>
      </div>
    </Link>
  );
};
