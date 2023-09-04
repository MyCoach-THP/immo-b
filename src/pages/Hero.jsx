import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className='m-8'>Bienvenue sur ImmoConnect</h1>
        <p className='m-10'>Plongez dans la révolution de l'achat et de la vente immobilière,<br />où chaque propriété est une opportunité unique.</p>
        <div className="cta-buttons">
          <Link to="/login" className="button m-4">Je suis propriétaire</Link>
          <Link to="/properties" className="button m-4">Découvrir les biens</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;