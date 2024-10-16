import React from "react";
import { MdOutlineDescription } from "react-icons/md";

export const VisitSection = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-xl my-5">Places to Visit</h2>
      <div>
        {/* Assuming trip.tripsData.plans is an array of strings */}
        {trip?.tripData?.plans?.map((plan, index) => (
          <div key={index} className="my-3 flex flex-col">
            <div className=" rounded-md hover:scale-105 transition-all hover:shadow-md p-4 flex-col flex gap-10 md:flex-row shadow">
              <div>
                <img src="https://images.pexels.com/photos/2305761/pexels-photo-2305761.jpeg?auto=compress&cs=tinysrgb&w=600" alt="image" className="md:w-44 rounded-md"/>
              </div>
              <div>
            <h2 className="font-medium text-lg">{plan.activity}</h2>
            {/* <h2 className="font-medium text-md text-gray-500">
              {plan.activity}
            </h2> */}
            <p>💰: {plan.cost}</p>
            <p>⭐: {plan.rating}</p>
            <p className="flex align-middle text-center ">
            {plan.details}</p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
