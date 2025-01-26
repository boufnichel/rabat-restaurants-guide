import React, { useState } from 'react';

const restaurants = [
  {
    name: "Restaurant Marea",
    rating: 4.7,
    address: "9 rue AL Mariniyine, Rabat 10020, Morocco",
    location: [34.0209399, -6.8281629]
  },
  {
    name: "Dar Al Achab",
    rating: 4.5,
    address: "34, Avenue al alaouiyine, Av. Moulay Hassan, Rabat 10020, Morocco",
    location: [34.0214705, -6.825218200000001]
  },
  {
    name: "Sufra Restaurant",
    rating: 4.5,
    address: "19 Av. Moulay Rachid, Rabat, Morocco",
    location: [34.0206282, -6.830479599999999]
  },
  {
    name: "Dar El Medina",
    rating: 4.4,
    address: "3 rue benjelloul souk sebbat, Rabat, Morocco",
    location: [34.0264242, -6.8335072]
  },
  {
    name: "Ty Potes",
    rating: 4.4,
    address: "11 Rue Ghafsa, Rabat 10000, Morocco",
    location: [34.0171791, -6.831948799999999]
  }
];

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const getStaticMapUrl = () => {
    const markers = restaurants.map((r, index) => 
      `markers=color:red%7Clabel:${index+1}%7C${r.location[0]},${r.location[1]}`
    ).join('&');

    return `https://maps.googleapis.com/maps/api/staticmap?center=34.0209,-6.8241&zoom=12&size=600x300&${markers}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Top Restaurants in Rabat
        </h1>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {restaurants.map((restaurant, index) => (
            <div 
              key={index} 
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <h2 className="text-xl font-semibold text-gray-800">{restaurant.name}</h2>
              <p className="text-yellow-600">Rating: {restaurant.rating} ★</p>
              <p className="text-gray-600 text-sm">{restaurant.address}</p>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <img 
            src={getStaticMapUrl()} 
            alt="Rabat Restaurants Map" 
            className="w-full h-[300px] object-cover"
          />
        </div>

        {selectedRestaurant && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{selectedRestaurant.name}</h2>
              <p className="text-yellow-600 mb-2">Rating: {selectedRestaurant.rating} ★</p>
              <p className="text-gray-700 mb-4">{selectedRestaurant.address}</p>
              <div className="flex space-x-4">
                <a 
                  href={`https://maps.google.com/maps?q=${selectedRestaurant.location[0]},${selectedRestaurant.location[1]}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Open in Maps
                </a>
                <button 
                  onClick={() => setSelectedRestaurant(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;