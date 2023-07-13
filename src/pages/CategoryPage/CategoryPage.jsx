import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { database, ref, onValue } from "../../firebase/config";
import CategoryItemComponent from "../../components/CategoryComponent/CategoryItemComponent";
import { Pagination, styled } from "@mui/material";

const CenteredPagination = styled(Pagination)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: "3rem 0",
  "& .MuiPagination-ul": {
    "& .MuiPaginationItem-root": {
      fontSize: "1.2rem",
    },
  },
}));

function CategoryPage() {
  const location = useLocation();
  const categoryPath = location.pathname.replace("/", "");

  const [categoryData, setCategoryData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const categoryRef = ref(database, categoryPath);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data) {
        setCategoryData(data);
      }
    });
  }, [categoryPath]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryPath]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(categoryData)
    ? categoryData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <CategoryItemComponent categoryData={currentItems} />
      {categoryData && categoryData.length > itemsPerPage && (
        <CenteredPagination
          count={Math.ceil(categoryData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default CategoryPage;
