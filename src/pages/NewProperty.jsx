import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../components/atoms";

const NewProperty = () => {
  const [authState, setAuthState] = useAtom(authAtom);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null); // New state for photo
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  
  const handleCityChange = event => {
    setCity(event.target.value.toUpperCase());
  }
  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]); // New handler for photo
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("property[title]", title);
    formData.append("property[description]", description);
    formData.append("property[price]", price);
    formData.append("property[city]", city);

    if (photo) {
      formData.append("property[photos][]", photo); // Attach photo if it exists
    }

    try {
      const response = await fetch("http://localhost:3000/properties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData, // Use FormData
      });

      if (response.ok) {
        navigate("/owner");
      } else {
        console.error("Error creating property");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className='secondaryContainer'>
      <h2>Créer une nouvelle annonce</h2>
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
          Ville:
          <input type="text" name="city" value={city} onChange={handleCityChange} />
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
          <input type='file' name='photo' onChange={handlePhotoChange} />{" "}
          {/* New input for photo */}
        </label>
        <button type='submit'>Créer</button>
      </form>
    </div>
  );
};

export default NewProperty;
