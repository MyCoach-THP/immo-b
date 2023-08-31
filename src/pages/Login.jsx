import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom } from '../components/atoms'
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useAtom(authAtom);
  const navigate = useNavigate();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  let authToken;

  const handleLogin = event => {
    event.preventDefault();

    const requestData = {
      user: {
        email: email,
        password: password
      }
    };

    fetch('http://localhost:3000/users/sign_in', {
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
          throw new Error('La connexion a échoué');
        }
      })
      .then(data => {
        const userId = data.user.id
        setAuthState({ isLoggedIn: true, token: authToken, userId: userId });
        const cookieObj = {
          token: authToken,
          userId: userId
        }
        Cookies.set('authTokenCookie', JSON.stringify(cookieObj))
        navigate('/articles');
        console.log('Réponse de connexion :', data);
      })
      .catch(error => {
        console.error('Erreur de connexion :', error);
      });
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Se connecter</button>
      </form>
      <div>
        <Link to="/forgotPassword">Mot de passe oublié</Link>
      </div>
    </div>
  );
};

export default Login;