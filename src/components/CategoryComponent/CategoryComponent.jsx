import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../../firebase/config";
import { Grid, CardContent, Typography, CardMedia, Pagination, IconButton } from "@mui/material";
import Loader from "../Loader/Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { CardWrapper, PaginationWrapper } from "./CategoryStyles";

const ITEMS_PER_PAGE = 12;
const DISPLAYED_PAGES = 8;

const CategoryComponent = ({ category }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? parseInt(storedPage) : 1;
  });
  const [totalPages, setTotalPages] = useState(1);
  const [showAllPages, setShowAllPages] = useState(false);

  useEffect(() => {
    const categoryRef = ref(database, category);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategoryData(data);
        const totalItems = Object.values(data).flat().length;
        setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
        if (totalItems <= ITEMS_PER_PAGE) {
          setPage(1);
        }
      }
    });
  }, [category]);

  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getCategoryItemsSlice = () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return Object.values(categoryData)?.flat()?.slice(startIndex, endIndex) || [];
  };

  const handleExpandPages = () => {
    setShowAllPages(true);
  };

  if (!categoryData) {
    return <Loader />;
  }

  const totalItems = Object.values(categoryData).flat().length;
  const isSinglePage = totalItems <= ITEMS_PER_PAGE;

  return (
    <div>
      <h1>{category}</h1>
      <Grid container spacing={2}>
        {getCategoryItemsSlice().map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <CardWrapper>
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/${encodeURIComponent(item?.title?.replace(/[.,(),%\s]/g, "-"))?.toLowerCase()}`}>
                <CardMedia
                  component="img"
                  height="auto"
                  src={item?.images?.[0]}
                  alt="Product"
                />
                <CardContent>
                  <Typography variant="h6">{item?.model}</Typography>
                  <Typography variant="body2">{item?.title}</Typography>
                  <Typography variant="body2">Ціна: {item?.price}</Typography>
                </CardContent>
              </Link>
            </CardWrapper>
          </Grid>
        ))}
      </Grid>
      {!isSinglePage && (
        <PaginationWrapper>
          <Pagination
            count={showAllPages ? totalPages : Math.min(totalPages, DISPLAYED_PAGES)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            siblingCount={2}
            boundaryCount={2}
            showFirstButton
            showLastButton
          />
          {!showAllPages && totalPages > DISPLAYED_PAGES && (
            <IconButton onClick={handleExpandPages}>
              <ExpandMoreIcon />
            </IconButton>
          )}
        </PaginationWrapper>
      )}
    </div>
  );
};

export default CategoryComponent;