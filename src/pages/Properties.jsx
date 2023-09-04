import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [city, setCity] = useState('');

  useEffect(() => {
    fetch("http://localhost:3000/properties")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.error("Received data is not an array:", data);
        }
      })
      .catch((error) => console.error("An error occurred:", error));
  }, []);
  
  let visibleProperties = properties.filter(property => !property.private)

  const handleCityChange = (e) => {
    setCity(e.target.value.toUpperCase());
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/properties?city=${city}`);
      if (response.ok) {
        const data = await response.json();
        setProperties(data)
        visibleProperties = properties.filter(property => !property.private);
      } else {
        console.error('Une erreur s\'est produite lors de la recherche :', response.statusText);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la recherche :', error);
    }
  };

  return (
    <div className='secondaryContainer'>
      <h2>Liste des biens</h2>
      <div>
        <input
          type="text"
          placeholder="Ville..."
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleProperties.length < 1 ? (
          <p>Aucun résultat à votre recherche.</p>
        ) : (
          visibleProperties.map(property => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              description={property.description}
              price={property.price}
              city={property.city}
              photoUrls={property.photoUrls}
            />
          )).reverse()
        )}
      </div>
    </div>
  );
};

export default Properties;
