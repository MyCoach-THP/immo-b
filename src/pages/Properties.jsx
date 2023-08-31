import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/properties')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Une erreur s\'est produite :', error));
  }, []);

  const visibleProperties = properties.filter(property => !property.private)

  return (
    <div className='secondaryContainer'>
      <h2>Liste des biens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleProperties.map(property => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            description={property.description}
            price={property.price}
          />
        )).reverse()}
      </div>
    </div>
  );
}

export default Properties;