import React, { useState } from 'react';
import './Directory.css';

function Directory() {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toUpperCase());
  };

  const tradespeople = [
    {
      name: "John Smith",
      title: "Electrician",
      phone: "555-555-5555",
      email: "jsmith@emailer.com",
      image: "https://i.postimg.cc/8cv9swXr/Master-Builder-Apprentice-Steve-Davey2015-MBA-winner.jpg"
    },
    {
      name: "Alice Johnson",
      title: "Plumber",
      phone: "555-555-5555",
      email: "ajohnson@emailer.com",
      image: "https://i.postimg.cc/8cv9swXr/Master-Builder-Apprentice-Steve-Davey2015-MBA-winner.jpg"
    },
    {
      name: "David Clark",
      title: "Carpenter",
      phone: "555-555-5555",
      email: "dclark@emailer.com",
      image: "https://i.postimg.cc/8cv9swXr/Master-Builder-Apprentice-Steve-Davey2015-MBA-winner.jpg"
    },
    {
      name: "Sarah Taylor",
      title: "Painter",
      phone: "555-555-5555",
      email: "staylor@emailer.com",
      image: "https://i.postimg.cc/8cv9swXr/Master-Builder-Apprentice-Steve-Davey2015-MBA-winner.jpg"
    },
    // Add all remaining tradespeople here...
    {
      name: "Sophia Evans",
      title: "Plumber",
      phone: "555-555-5555",
      email: "sevans@emailer.com",
      image: "https://i.postimg.cc/8cv9swXr/Master-Builder-Apprentice-Steve-Davey2015-MBA-winner.jpg"
    },
    {
      name: "Nathan Harris",
      title: "Electrician",
      phone: "555-555-5555",
      email: "nharris@emailer.com",
      image: "https://i.postimg.cc/8cv9swXr/Master-Builder-Apprentice-Steve-Davey2015-MBA-winner.jpg"
    }
  ];

  return (
    <div className="box">
      <h1><em>UK Trades Directory</em></h1>
      <br />
      <input
        type="text"
        id="filter"
        onChange={handleFilterChange}
        value={filter}
        placeholder="Search for TradesPerson..."
        title="Type in a trade"
      />
      <div id="directory">
        {/* Filtered tradespeople */}
        {tradespeople.map((person, index) => (
          <div key={index} style={{ display: person.title.toUpperCase().includes(filter) ? '' : 'none' }}>
            <img src={person.image} alt="Tradesperson" />
            <span className="name">{person.name}</span>
            <br />
            <span className="title">{person.title}</span>
            <br />
            <span className="subcontact">
              <br />
              <b><em>Phone:</em></b> {person.phone}
              <br />
              <b><em>Email:</em></b> {person.email}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Directory;
