import React from "react";

const Card = ({ image, title, category, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white flex flex-col h-full">
      <div className="h-64 overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={title} />
      </div>
      <div className="flex flex-col flex-grow px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">{title}</div>
        <p className="text-gray-700 text-base truncate">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 uppercase">
          {category}
        </span>
      </div>
    </div>
  );
};

export default Card;
