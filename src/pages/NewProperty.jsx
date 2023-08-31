import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../components/atoms'

const NewProperty = () => {
  const [authState, setAuthState] = useAtom(authAtom);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0)
  const navigate = useNavigate();

  const handleTitleChange = event => {
    setTitle(event.target.value);
  }
  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  }
  const handlePriceChange = event => {
    setPrice(event.target.value);
  }

  const handleSubmit = async (e) => {
    const requestData = {
      title: title,
      description: description,
      price: price
    };

    console.log(`Bearer ${authState.token}`)
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/properties', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        navigate('/owner');
      } else {
        console.error('Une erreur s\'est produite lors de la création de la propriété :', error);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <div className='secondaryContainer'>
      <h2>Créer une nouvelle annonce</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titre:
          <input type="text" name="title" value={title} onChange={handleTitleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Prix:
          <input type="number" name="price" value={price} onChange={handlePriceChange} />
        </label>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default NewProperty;
