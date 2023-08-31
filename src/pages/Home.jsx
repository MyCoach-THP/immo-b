import React from 'react';

function Home() {
  return (
    <div className="secondaryContainer">
      <h1>Bienvenue sur notre site</h1>
      <p className="text-center mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className="section">
        <h2 className="text-xl font-semibold mb-4">Nos Services</h2>
        <p>
          Explorez nos services de haute qualité.
        </p>

      </div>

      <div className="section">
        <h2 className="text-xl font-semibold mb-4">Nos Produits</h2>
        <p>
          Découvrez nos produits exclusifs.
        </p>

      </div>
    </div>
  );
}

export default Home;
