import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function PropertyCard({
  id,
  title,
  description,
  price,
  photoUrls,
}) {
  const truncatedTitle =
    title.length > 23 ? title.substring(0, 20) + "..." : title;
  const truncatedDescription =
    description.length > 50
      ? description.substring(0, 50) + "..."
      : description;

  const firstPhotoUrl =
    photoUrls && photoUrls.length > 0
      ? photoUrls[0]
      : "/src/assets/preview.avif";

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
