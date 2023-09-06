import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export default function PropertyCard({ id }) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/properties/${id}`) // J'ai supprimé le "properties" redondant.
      .then((response) => response.json())
      .then((data) => {
        setProperty(data);
      })
      .catch((error) => console.error("Une erreur s'est produite :", error));
  }, [id]);

  if (!property) {
    return <div className='loading-message'>Chargement en cours...</div>;
  }

  const { title, description, price, photos } = property; // J'ai changé "photo_urls" à "photos".

  const truncatedTitle =
    title.length > 23 ? title.substring(0, 20) + "..." : title;
  const truncatedDescription =
    description.length > 50
      ? description.substring(0, 47) + "..."
      : description;

  const firstPhotoUrl =
    photos && photos.length > 0 // J'ai utilisé "photos" ici au lieu de "property.photos".
      ? photos[0].url
      : "https://wallpapercave.com/wp/wp4110643.jpg";

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={firstPhotoUrl}
        title='Property Image'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {truncatedTitle}
        </Typography>
        <Typography variant='body2'>{truncatedDescription}</Typography>
        <Typography variant='body2'>Prix: {price} €</Typography>
      </CardContent>
      <CardActions>
        <Link to={`/properties/${id}`}>Voir</Link>
      </CardActions>
    </Card>
  );
}
