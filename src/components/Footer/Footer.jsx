import React from 'react';
import AppleIcon from '@mui/icons-material/Apple';
import { Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ marginTop: '30px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h6">Каталог зі списком продукції</Typography>
            <Link href="/applehub/iphone" style={{ color: 'inherit', textDecoration: 'none' }}>iPhone</Link>
            <Link href="/applehub/ipad" style={{ color: 'inherit', textDecoration: 'none' }}>iPad</Link>
            <Link href="/applehub/watch" style={{ color: 'inherit', textDecoration: 'none' }}>Watch</Link>
            <Link href="/applehub/headphones" style={{ color: 'inherit', textDecoration: 'none' }}>Headphones</Link>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h6">Про компанію</Typography>
            
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="center">
            <Typography variant="h6">Контакти</Typography>
            <Typography variant="body1">Email: example@example.com</Typography>
            <Typography variant="body1">Phone: +1234567890</Typography>
            <Typography variant="body1">Address: Some Address</Typography>
            {/* Добавьте ссылки на социальные сети */}
          </Grid>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justifyContent="center" mt={2}>
        <AppleIcon sx={{ fontSize: 40 }} />
        <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700, ml: 1 }}>
          AppleHub
        </Typography>
      </Grid>

      <Grid container justifyContent="center" mt={1}>
        <Typography variant="body2" sx={{ margin: '10px 0' }}>
          © 2023 AppleHub. Всі права захищені.
        </Typography>
      </Grid>
    </footer>
  );
};

export default Footer;