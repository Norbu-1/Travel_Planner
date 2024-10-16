import React from "react";
import { Link } from "react-router-dom";

export const HotelCard = ({ item, index }) => {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${item?.name}${item?.location}`}
      target="_blank"
    >
      <div id={index} className="hover:scale-105 transition-all cursor-pointer shadow rounded-xl">
        <img
          src={item.image}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-2 flex flex-col gap-2 p-2">
          <h2 className="font-medium px-1">{item?.name}</h2>
          <h2 className="text-xs text-gray-500">📍 {item?.location}</h2>
          <h2 className="text-sm">💰 {item?.price}</h2>
          <h2 className="text-sm">⭐ {item?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};
