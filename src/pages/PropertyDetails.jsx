import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MapWorld from '../components/Leaflet/WorldMap';
import { API_BASE_URL } from "../../config";

const PropertyDetails = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/properties/${propertyId}`)
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
      <h3>Existing Photos:</h3>
      {property.photos && property.photos.length > 0 ? (
        property.photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.url} alt={`Property ${photo.id + 1}`} />
          </div>
        ))
      ) : (
        <p>No existing photos.</p>
      )}
      <MapWorld city={property.city} />
      <div className='property-city'>Ville: {property.city}</div>
      <div className='property-description'>{property.description}</div>
      <div className='property-price'>Prix : {property.price} €</div>
      <div className='property-owner'>Propriétaire : {property.user.email}</div>
      <Link className='m-10' to='/'>
        Page d'accueil
      </Link>
    </div>
  );
};


export default PropertyDetails;
