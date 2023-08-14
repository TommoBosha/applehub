import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductByModel } from "../../redux/products/productOperations";
import CategoryItemComponent from "../../components/CategoryComponent/CategoryItemComponent";
import { useLocation } from "react-router-dom";
import { selectProductList } from "../../redux/products/productSelectors";
import { modelFormatMap } from "../../utils";
import { CenteredPagination } from "../../components/CategoryComponent/CategoryStyles";


function CategoryPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const categoryPath = location.pathname.replace("/", "");
  const formattedModel = modelFormatMap[categoryPath];
  console.log(formattedModel);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (formattedModel) {
      const getProduct = () => {
        dispatch(
          getProductByModel({
            model: formattedModel,
            page: currentPage,
            perPage: itemsPerPage,
          })
        );
      };

      getProduct();
    }
  }, [formattedModel, currentPage, dispatch, itemsPerPage]);

  const products = useSelector(selectProductList);
  const totalPages = Math.ceil(products.productList.total / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryPath]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <CategoryItemComponent categoryData={products.productList.products} />

      {totalPages && (
        <CenteredPagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default CategoryPage;
