export const incNumber = (product) => {
  console.log("in action increment");

  return {
    type: "INCREMENT",
    payload: product,
  };
};

export const decNumber = (product) => {
  return {
    type: "DECREMENT",
    payload: product,
  };
};

export const addToCart = (productDetails) => {
  return {
    type: "addToCart",
    payload: productDetails,
  };
};
