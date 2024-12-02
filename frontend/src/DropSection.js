import React, { useState } from 'react';

const DropSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const locations = [
    "Bedfordshire", "Berkshire", "Bristol", "Buckinghamshire",
    "Cambridgeshire", "Cheshire", "Cornwall", "Durham",
    "Derbyshire", "Devon", "Dorset", "Essex",
    "Gloucestershire", "Hampshire", "Herefordshire", "Hertfordshire",
    "Huntingdonshire", "Kent", "Lancashire", "Leicestershire",
    "Lincolnshire", "Middlesex", "Norfolk", "Northamptonshire",
    "Northumberland", "Nottinghamshire", "Oxfordshire", "Shropshire",
    "Somerset", "Staffordshire", "Suffolk", "Surrey",
    "Sussex", "Warwickshire", "Wiltshire", "Worcestershire",
    "Yorkshire"
  ];

  const handleLocationClick = (location) => {
    console.log(`Selected location: ${location}`);
    // Implement your location selection logic here
  };

  return (
    <div className="my-6 drop-section">
      <h2
        className="text-xl font-bold cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      >
        View local tradespeople in your area
      </h2>
      {isOpen && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {locations.map((location, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded shadow hover:bg-gray-300 transition">
              <button onClick={() => handleLocationClick(location)}>
                {location}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropSection;
