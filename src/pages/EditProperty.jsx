import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../components/atoms'

const EditProperty = () => {
  const [authState, setAuthState] = useAtom(authAtom);
  const { id } = useParams(); // Supposons que l'ID de la propriété soit passé en tant que paramètre d'URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérez les détails de la propriété à partir de l'API et initialisez les états
    fetch(`http://localhost:3000/properties/${id}`)
      .then(response => response.json())
      .then(data => {
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch(error => console.error('Une erreur s\'est produite :', error));
  }, [id]);

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

    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authState.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        navigate('/owner');
      } else {
        console.error('Une erreur s\'est produite lors de la mise à jour de la propriété :', error);
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <div className='secondaryContainer'>
      <h2>Modifier une annonce</h2>
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
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default EditProperty;
