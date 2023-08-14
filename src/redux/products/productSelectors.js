
export const selectProductList = (state) => state.products;

export const selectSingleProduct = (state) => state.products.singleProduct;

export const selectLoading = (state) => state.products.loading;

export const selectError = (state) => state.products.error;