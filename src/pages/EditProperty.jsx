import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../components/atoms";
import { API_BASE_URL } from "../../config";

const EditProperty = () => {
  const [authState, setAuthState] = useAtom(authAtom);
  const { id } = useParams(); // Supposons que l'ID de la propriété soit passé en tant que paramètre d'URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [photoData, setPhotoData] = useState([]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);

      let tmpPhotos = [];
      data.photos.forEach(p=>{  tmpPhotos.push(p);})
      setPhotoData(tmpPhotos);

    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
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
    const files = Array.from(event.target.files);
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("property[title]", title);
    formData.append("property[description]", description);
    formData.append("property[price]", price);

    if (photos.length > 0) {
      photos.forEach((photo, index) => {
        formData.append("property[photos][]", photo); // Utilisez '[]' pour indiquer qu'il s'agit d'un tableau de fichiers
      });
    }

    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json(); // Suppose que la réponse est un JSON valide
        fetchPropertyDetails();
        navigate("/owner");
      } else {
        if (response.headers.get("Content-Type") === "application/json") {
          const errorData = await response.json();
          console.error("Error updating property:", errorData);
        } else {
          const text = await response.text();
          console.error("Error updating property. Server response:", text);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const deletePhoto = async (photoId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/properties/${id}/delete_photo?photo_id=${photoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      if (response.ok) {
        fetchPropertyDetails();
      } else {
        console.error("Error deleting photo");
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
          <input
            type='file'
            name='photos'
            onChange={handlePhotoChange}
            multiple
          />
        </label>
        <button type='submit'>Mettre à jour</button>
      </form>
      <h3>Existing Photos:</h3>
      {photoData && photoData.length > 0 ? (
        photoData.map(p => (
          <div key={p.id}>
            <img src={p.url} alt={`Property ${p.id + 1}`} />
            <button onClick={() => deletePhoto(p.id)}>Delete</button>{" "}
          </div>
        ))
      ) : (
        <p>No existing photos.</p>
      )}
    </div>
  );
};

export default EditProperty;
