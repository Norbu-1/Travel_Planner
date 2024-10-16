import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-8 md:mx-48 gap-8 mt-20 p-8 rounded-lg ">
      <h1 className="font-extrabold text-5xl text-center text-blue-800 leading-tight">
        <span className="text-red-600 ">
          Embark on a Journey Across the U.S.:
        </span>{" "}
        Tailored Adventures from Coast to Coast
      </h1>
      <p className="text-md  text-gray-700 text-center leading-relaxed">
        From the skyscrapers of New York to the beaches of Miami, your perfect American adventure awaits. Let US craft the ultimate travel itinerary just for you!
      </p>
      <Link to={"/create-trip"}>
        <Button className="bg-black hover:bg-[#252525] text-white py-3 px-8 text-lg rounded-lg">
          Start Planning Now
        </Button>
      </Link>
    </div>
  );
};
