import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';

const products = [
  {
    image: 'https://images.unsplash.com/photo-1603816245457-fe9c80b740ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=433&q=80',
    title: 'iPhone',
    description: 'Выберают за его качество, производительность, операционную систему, камеру, безопасность, поддержку, дизайн, интеграцию и репутацию.',
  },
  {
    image: 'https://images.unsplash.com/photo-1630331528526-7d04c6eb463f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1181&q=80',
    title: 'iPad',
    description: 'Выберают за его портативность, мощность, многофункциональность, большой экран, долгую работу от аккумулятора, поддержку Apple Pencil, экосистему Apple, качество изготовления, удобство использования и широкий выбор приложений.',
  },
  {
    image: 'https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=402&q=80',
    title: 'Watch',
    description: 'Выбирают за его функциональность, стильный дизайн, здоровье и фитнес-функции, уведомления, поддержку экосистемы Apple, высокую производительность, удобство использования, долгую работу от аккумулятора и множество доступных приложений.',
  },
  {
    image: 'https://images.unsplash.com/photo-1580477371194-4593e3c7c6cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    title: 'Headphones',
    description: 'Выбирают за их беспроводную связь, отличное качество звука, удобство ношения, долгую автономную работу, интеграцию с экосистемой Apple, удобное управление, быструю зарядку, стильный дизайн и широкую популярность.',
  },
];

const CatalogComponent = () => {
  return (
    <Grid container spacing={2} marginTop={6} justifyContent="center">
      {products.map((product, index) => (
        <Grid item xs={6} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 500, height: 700, borderRadius: '30px'}}>
            <CardActionArea component={Link} to={`/${product.title.toLowerCase()}`}>
              <img src={product.image} alt={product.title} width={480} height={480} style={{ borderRadius: '50px', margin: '15px 10px' }} />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom align="center" sx={{ fontSize: 20 }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" align="center" sx={{ fontSize: 16 }}>
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CatalogComponent;