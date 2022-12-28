export const incNumber = (num) => {
  console.log('in action increment')

  return {
    type: "INCREMENT",
    payload: num
  };
};

export const decNumber = () => {
  return { type: "DECREMENT" };
};

export const addToCart = (productDetails) => {
  return {
    type: "addToCart",
    payload: productDetails,
  };
};
