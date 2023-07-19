import React from "react";
import { Container, Grid, Typography } from "@mui/material";

const imageStyle = {
  width: "479px",
  height: "479px",
  borderRadius: "40px",
};

const containerStyle = {
  marginTop: "30px",
};

const InfoComponent = () => {
  return (
    <Container style={containerStyle}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <img
            src="https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="MacBooks"
            style={imageStyle}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs>
              <Typography variant="h3" align="center">
                Вражаючі MacBooks
              </Typography>
              <Typography variant="body1" align="center">
                Ультратонкі та потужні ноутбуки від Apple стануть вашими
                незамінними помічниками у житті та роботі.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" marginTop="40px">
        <Grid item xs={12} sm container>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={2}
            alignItems="center"
          >
            <Grid item xs>
              <Typography variant="h3" align="center">
                Камери iPhone
              </Typography>
              <Typography variant="body1" align="center">
                Знімайте захоплюючі фотографії та відео з ультра широкими
                лінзами нових моделей iPhone
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <img
            src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
            alt="iPhone"
            style={imageStyle}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default InfoComponent;
