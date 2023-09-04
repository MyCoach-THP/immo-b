import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../components/atoms";

const EditProperty = () => {
  const [authState, setAuthState] = useAtom(authAtom);
  const { id } = useParams(); // Supposons que l'ID de la propriété soit passé en tant que paramètre d'URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        if (data.photo_urls && data.photo_urls.length > 0) {
          setPhotoURL(data.photo_urls[0]); // Assume first URL is the main photo
        }
      })
      .catch((error) => console.error("Une erreur s'est produite :", error));
  }, [id]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("property[title]", title);
    formData.append("property[description]", description);
    formData.append("property[price]", price);
    if (photo) {
      formData.append("property[photos][]", photo); // Use '[]' to indicate an array of files
    }
    try {
      const response = await fetch(`http://localhost:3000/properties/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedProperty = await response.json();
        setTitle(updatedProperty.title);
        setDescription(updatedProperty.description);
        setPrice(updatedProperty.price);
        setPhotoURL(updatedProperty.photo_url);

        navigate("/owner");
      } else {
        console.error("Error updating property");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className='secondaryContainer'>
      <h2>Modifier une annonce</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titre:
          <input
            type='text'
            name='title'
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name='description'
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <label>
          Prix:
          <input
            type='number'
            name='price'
            value={price}
            onChange={handlePriceChange}
          />
        </label>
        <label>
          Photo:
          <input type='file' name='photo' onChange={handlePhotoChange} />
        </label>

        <button type='submit'>Mettre à jour</button>
      </form>
      <img src={photoURL} alt='Property' />
    </div>
  );
};

export default EditProperty;
