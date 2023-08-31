import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAtom } from 'jotai';
import { authAtom } from '../components/atoms'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useAtom(authAtom); // Assurez-vous d'importer le bon atome ici
  const navigate = useNavigate();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  let authToken;

  const handleRegister = event => {
    event.preventDefault();

    const requestData = {
      user: {
        email: email,
        password: password
      }
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
      .then(response => {
        if (response.ok) {
          const authHeader = response.headers.get("Authorization");
          authToken = authHeader.split(" ")[1];
          return response.json();
        } else {
          throw new Error('Inscription échouée');
        }
      })
      .then(data => {
        const userId = data.user.id;
        setAuthState({ isLoggedIn: true, token: authToken, userId: userId });
        const cookieObj = {
          token: authToken,
          userId: userId
        };
        Cookies.set('authTokenCookie', JSON.stringify(cookieObj));
        navigate('/articles');
        console.log('Réponse d\'inscription :', data);
      })
      .catch(error => {
        console.error('Erreur d\'inscription :', error);
      });
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;