import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams(); // Récupère le token de réinitialisation depuis les paramètres d'URL
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
        const response = await fetch(`http://localhost:3000/reset_passwords/${token}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password })
        });

        if (response.ok) {
          // Rediriger vers une page de confirmation ou afficher un message de succès
          // Par exemple : navigate('/passwordResetConfirmation');
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
    <div>
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
