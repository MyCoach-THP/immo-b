import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';
import { authAtom } from '../components/atoms'
import { API_BASE_URL } from "../../config";

const OwnerDashboard = () => {
  const [authState, setAuthState] = useAtom(authAtom);
  const [userProperties, setUserProperties] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    console.log(authState)
    fetch(`${API_BASE_URL}/properties?user_id=${authState.user_id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUserProperties(data))
      .catch((error) => console.error("Une erreur s'est produite :", error));
  }, [authState, refreshToggle]);

  const handleToggleVisibility = async (propertyId, currentVisibility) => {
    try {
      const newVisibility = !currentVisibility;
      await fetch(`${API_BASE_URL}/properties/${propertyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ private: newVisibility }),
      });
      setRefreshToggle(prevToggle => !prevToggle);

    } catch (error) {
      console.error('Une erreur s\'est produite lors de la suppression de la propriété :', error);
    }
  };

  const visibleProperties = userProperties.filter(property => !property.private)

  return (
    <div className='secondaryContainer'>
      <h2>Tableau de bord du propriétaire</h2>
      <Link to="/newProperty">Créer une nouvelle annonce</Link>
      <ul>
        {visibleProperties.map(property => (
          <li key={property.id}>
            <h3>{property.title}</h3>
            <p>visible : {property.private ? 'non' : 'oui'}</p>
            <p>{property.description}</p>
            <Link to={`/EditProperty/${property.id}`}>Editer</Link>
            <button onClick={() => handleToggleVisibility(property.id, property.private)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;