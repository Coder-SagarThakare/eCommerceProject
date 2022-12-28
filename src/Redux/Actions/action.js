export const incNumber = (product) => {
  console.log("in action increment");

  return {
    type: "INCREMENT",
    payload: product,
  };
};

export const decNumber = (productId) => {
  return {
    type: "DECREMENT",
    payload: productId,
  };
};

export const addToCart = (productDetails) => {
  return {
    type: "addToCart",
    payload: productDetails,
  };
};
