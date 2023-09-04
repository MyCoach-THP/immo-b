import React, { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";

const Properties = () => {
  const [properties, setProperties] = useState([]);

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

  const visibleProperties = Array.isArray(properties)
    ? properties.filter((property) => !property.private)
    : [];

  return (
    <div className='secondaryContainer'>
      <h2>Liste des biens</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {visibleProperties
          .map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              description={property.description}
              price={property.price}
              photoUrls={property.photoUrls}
            />
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default Properties;
