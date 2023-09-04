import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${propertyId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the fetched data
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

      {property.photoUrls ? (
        <div className='property-images'>
          {property.photoUrls.map((url, index) => (
            <img key={index} src={url} alt={`Property ${index + 1}`} />
          ))}
        </div>
      ) : (
        <p>No photos available.</p>
      )}

      <div className='property-description'>{property.description}</div>
      <div className='property-price'>Prix : {property.price} €</div>
      <div className='property-owner'>Propriétaire : {property.user.email}</div>
    </div>
  );
};

export default PropertyDetails;
