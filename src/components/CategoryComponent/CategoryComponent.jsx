import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../../firebase/config";
import { CardContent, Typography, CardMedia, IconButton } from "@mui/material";
import Loader from "../Loader/Loader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { CardWrapper, PaginationWrapper } from "./CategoryStyles";
import InfiniteScroll from "react-infinite-scroller";

const ITEMS_PER_PAGE = 12;

const CategoryComponent = ({ category }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const categoryRef = ref(database, category);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCategoryData(data);
        const totalItems = Object.values(data).flat().length;
        if (totalItems <= ITEMS_PER_PAGE) {
          setHasMore(false);
        }
      }
    });
  }, [category]);

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + ITEMS_PER_PAGE);
  };

  const getCategoryItemsSlice = () => {
    return (
      Object.values(categoryData)
        ?.flat()
        ?.slice(0, startIndex + ITEMS_PER_PAGE) || []
    );
  };

  const handleExpandPages = () => {
    setHasMore(true);
  };

  if (!categoryData) {
    return <Loader />;
  }

  return (
    <div>
      <h1>{category}</h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleLoadMore}
        hasMore={hasMore}
        loader={<Loader key={0} />}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {getCategoryItemsSlice().map((item, index) => (
            <div key={index} style={{ width: "32%", marginBottom: "2rem" }}>
              <CardWrapper>
                <Link
                  style={{ color: "inherit", textDecoration: "none" }}
                  to={`/${encodeURIComponent(
                    item?.title?.replace(/[.,(),%\s]/g, "-")
                  )?.toLowerCase()}`}
                >
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
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {hasMore && (
        <PaginationWrapper>
          <IconButton onClick={handleExpandPages}>
            <ExpandMoreIcon />
          </IconButton>
        </PaginationWrapper>
      )}
    </div>
  );
};

export default CategoryComponent;

// import React, { useEffect, useState } from "react";
// import { database, ref, onValue } from "../../firebase/config";
// import { Grid, CardContent, Typography, CardMedia, Pagination, IconButton } from "@mui/material";
// import Loader from "../Loader/Loader";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Link } from "react-router-dom";
// import { CardWrapper, PaginationWrapper } from "./CategoryStyles";

// const ITEMS_PER_PAGE = 12;
// const DISPLAYED_PAGES = 8;

// const CategoryComponent = ({ category }) => {
//   const [categoryData, setCategoryData] = useState(null);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showAllPages, setShowAllPages] = useState(false);

//   useEffect(() => {
//     const categoryRef = ref(database, category);
//     onValue(categoryRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setCategoryData(data);
//         const totalItems = Object.values(data).flat().length;
//         setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
//         if (totalItems <= ITEMS_PER_PAGE) {
//           setPage(1);
//         }
//       }
//     });
//   }, [category]);

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const getCategoryItemsSlice = () => {
//     const startIndex = (page - 1) * ITEMS_PER_PAGE;
//     const endIndex = startIndex + ITEMS_PER_PAGE;

//     return Object.values(categoryData)?.flat()?.slice(startIndex, endIndex) || [];
//   };

//   const handleExpandPages = () => {
//     setShowAllPages(true);
//   };

//   if (!categoryData) {
//     return <Loader />;
//   }

//   const totalItems = Object.values(categoryData).flat().length;
//   const isSinglePage = totalItems <= ITEMS_PER_PAGE;

//   return (
//     <div>
//       <h1>{category}</h1>
//       <Grid container spacing={2}>
//         {getCategoryItemsSlice().map((item, index) => (
//           <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
//             <CardWrapper>
//               <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/${encodeURIComponent(item?.title?.replace(/[.,(),%\s]/g, "-"))?.toLowerCase()}`}>
//                 <CardMedia
//                   component="img"
//                   height="auto"
//                   src={item?.images?.[0]}
//                   alt="Product"
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{item?.model}</Typography>
//                   <Typography variant="body2">{item?.title}</Typography>
//                   <Typography variant="body2">Ціна: {item?.price}</Typography>
//                 </CardContent>
//               </Link>
//             </CardWrapper>
//           </Grid>
//         ))}
//       </Grid>
//       {!isSinglePage && (
//         <PaginationWrapper>
//           <Pagination
//             count={showAllPages ? totalPages : Math.min(totalPages, DISPLAYED_PAGES)}
//             page={page}
//             onChange={handlePageChange}
//             color="primary"
//             size="large"
//             siblingCount={2}
//             boundaryCount={2}
//             showFirstButton
//             showLastButton
//           />
//           {!showAllPages && totalPages > DISPLAYED_PAGES && (
//             <IconButton onClick={handleExpandPages}>
//               <ExpandMoreIcon />
//             </IconButton>
//           )}
//         </PaginationWrapper>
//       )}
//     </div>
//   );
// };

// export default CategoryComponent;
