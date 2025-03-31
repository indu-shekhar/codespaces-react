import React from 'react';
import { FaTrophy, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { AiFillFire } from 'react-icons/ai';

function BadgeDisplay({ badges }) {
  // Function to get icon based on badge type
  const getBadgeIcon = (icon) => {
    switch(icon) {
      case 'trophy': return <FaTrophy className="text-yellow-500" size={24} />;
      case 'users': return <FaUsers className="text-blue-500" size={24} />;
      case 'fire': return <AiFillFire className="text-red-500" size={24} />;
      case 'check': return <FaCheckCircle className="text-green-500" size={24} />;
      default: return <FaTrophy className="text-yellow-500" size={24} />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {badges.map(badge => (
        <div key={badge.id} className="flex flex-col items-center p-2 md:p-3 border rounded-lg hover:shadow-md transition text-center">
          <div className="mb-1 md:mb-2">
            {getBadgeIcon(badge.icon)}
          </div>
          <h3 className="text-xs md:text-sm font-medium text-gray-800">{badge.name}</h3>
          <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
        </div>
      ))}
    </div>
  );
}

export default BadgeDisplay;