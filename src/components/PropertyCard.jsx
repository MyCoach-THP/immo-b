import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function PropertyCard({ id }) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/properties/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProperty(data);
      })
      .catch((error) => console.error("Une erreur s'est produite :", error));
  }, [id]);

  if (!property) {
    return <div className='loading-message'>Chargement en cours...</div>;
  }

  const { title, description, price, photo_urls } = property;

  const truncatedTitle =
    title.length > 23 ? title.substring(0, 20) + "..." : title;
  const truncatedDescription =
    description.length > 50
      ? description.substring(0, 50) + "..."
      : description;
  const firstPhotoUrl =
    photo_urls && photo_urls.length > 0
      ? photo_urls[0]
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
