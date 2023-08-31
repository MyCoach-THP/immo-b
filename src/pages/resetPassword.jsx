import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value);
  };

  const handleResetPassword = async event => {
    event.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await fetch(`http://localhost:3000/password_resets/${token}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        });

        if (response.ok) {
          console.log('Mot de passe réinitialisé avec succès');
        } else {
          const data = await response.json();
          console.error('Erreur lors de la réinitialisation du mot de passe :', data.error);
        }
      } catch (error) {
        console.error('Une erreur s\'est produite :', error);
      }
    } else {
      console.error('Les mots de passe ne correspondent pas');
    }
  };

  return (
    <div className='secondaryContainer'>
      <h2>Réinitialisation du mot de passe</h2>
      <form onSubmit={handleResetPassword}>
        <div>
          <label htmlFor="password">Nouveau mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
    </div>
  );
};

export default ResetPassword;
