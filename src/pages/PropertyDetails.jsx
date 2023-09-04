import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MapWorld from '../components/Leaflet/mapworld';

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${propertyId}`)
      .then(response => response.json())
      .then(data => setProperty(data))
      .catch(error => console.error('Une erreur s\'est produite :', error));
  }, [propertyId]);

  if (!property) {
    return <div className='loading-message'>Chargement en cours...</div>;
  }

  return (
    <div className='secondaryContainer'>
      <h2 className='property-title'>{property.title}</h2>
      <div className='property-image mb-5'>
        <img src="../src/assets/preview.avif" alt="Property" />
      </div>
      <MapWorld/>
      <div className='property-description'>{property.description}</div>
      <div className='property-price'>Prix : {property.price} €</div>
      <div className='property-owner'>Propriétaire : {property.user.email}</div>
      <Link className = "mt-5" to = "/">Revenir à la page d'accueil</Link>
    </div>
  );
};

export default PropertyDetails;
