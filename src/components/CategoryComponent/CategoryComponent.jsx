import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../../firebase/config";
import { Grid, Card, CardContent, Typography, CardMedia, Pagination, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import Loader from "../Loader/Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const CardWrapper = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "rgba(25, 118, 210, 0.1)",
  marginTop: "30px",
  transition: "box-shadow 0.3s ease-in-out", 
  "&:hover": {
    boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.425)", 
  },
}));

const PaginationWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "50px",
});

const CategoryComponent = ({ category }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAllPages, setShowAllPages] = useState(false);

  useEffect(() => {
    const categoryRef = ref(database, category);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      if (data) {
        setCategoryData(data);
        const totalItems = Object.values(data).flat().length;
        setTotalPages(Math.ceil(totalItems / 12));
        if (totalItems <= 12) {
          setPage(1);
        }
      }
    });
  }, [category]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getCategoryItems = () => {
    const itemsPerPage = 12;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return Object.values(categoryData)
      .flat()
      .slice(startIndex, endIndex);
  };

  const handleExpandPages = () => {
    setShowAllPages(true);
  };

  if (!categoryData) {
    return <Loader />;
  }

  const totalItems = Object.values(categoryData).flat().length;
  if (totalItems <= 12) {
    return (
      <div>
        <h1>{category}</h1>
        <Grid container spacing={2}>
          {getCategoryItems().map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CardWrapper >
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/${encodeURIComponent(item.title.replace(/[.,(),%\s]/g, "-")).toLowerCase()}`} >
                <CardMedia
                  component="img"
                  height="auto"
                  src={item.images[0]}
                  alt="Product"
                />
                <CardContent>
                  <Typography variant="h6">{item.model}</Typography>
                  <Typography variant="body2">{item.title}</Typography>
                  <Typography variant="body2">Ціна: {item.price}</Typography>
                  </CardContent>
                  </Link>
              </CardWrapper>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  const displayedPages = showAllPages ? totalPages : 8;
  const hiddenPages = totalPages - displayedPages;

  return (
    <div>
      <Grid container spacing={2}>
        {getCategoryItems().map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CardWrapper>
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/${encodeURIComponent(item.title.replace(/[.,(),%\s]/g, "-")).toLowerCase()}`}>
              <CardMedia
                component="img"
                height="auto"
                src={item.images[0]}
                alt="Product"
              />
              <CardContent>
                <Typography variant="h6">{item.model}</Typography>
                <Typography variant="body2">{item.title}</Typography>
                <Typography variant="body2">Ціна: {item.price}</Typography>
                </CardContent>
                </Link>
            </CardWrapper>
          </Grid>
        ))}
      </Grid>
      <PaginationWrapper>
        <Pagination
          count={displayedPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          siblingCount={2}
          boundaryCount={2}
          showFirstButton
          showLastButton
        />
        {!showAllPages && hiddenPages > 0 && (
          <IconButton onClick={handleExpandPages}>
            <ExpandMoreIcon />
          </IconButton>
        )}
      </PaginationWrapper>
    </div>
  );
};

export default CategoryComponent;