import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${propertyId}`)
      .then((response) => response.json())
      .then((data) => {
        setProperty(data);
      })
      .catch((error) => console.error("Une erreur s'est produite :", error));
  }, [propertyId]);

  if (!property) {
    return <div className='loading-message'>Chargement en cours...</div>;
  }

  return (
    <div className='secondaryContainer'>
      <h2 className='property-title'>{property.title}</h2>
      {property.photo_urls ? (
        <div className='property-images'>
          {property.photo_urls.map((url, index) => (
            <img key={index} src={url} alt={`Property ${index + 1}`} />
          ))}
        </div>
      ) : (
        <p>No photos available.</p>
      )}
      <div className='property-city'>Ville: {property.city}</div>
      <div className='property-description'>{property.description}</div>
      <div className='property-price'>Prix : {property.price} €</div>
      <div className='property-owner'>Propriétaire : {property.user.email}</div>
      <Link className="m-10" to="/">Page d'accueil</Link>
    </div>
  );
};

export default PropertyDetails;
