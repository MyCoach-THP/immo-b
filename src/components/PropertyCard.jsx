import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'

export default function PropertyCard({ id, title, description, price }) {

  const truncatedTitle = title.length > 23 ? title.substring(0, 20) + '...' : title;

  const truncatedDescription = description.length > 50 ? description.substring(0, 50) + '...' : description;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/src/assets/preview.avif"
        title="Property Image"
      />
      <CardContent className='property-card-content'>
        <Typography gutterBottom variant="h5" component="div">
          {truncatedTitle}
        </Typography>
        <Typography variant="body2" className='property-card-typography'>
          {truncatedDescription}
        </Typography>
        <Typography variant="body2" className='property-card-typography'>
          Prix: {price} €
        </Typography>
      </CardContent>
      <CardActions className='property-card-action'>
        <Link to={`/properties/${id}`}>Voir</Link>
      </CardActions>
    </Card>
  );
}