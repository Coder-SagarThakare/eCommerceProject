export const incNumber = (product) => {
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

export const deleteFromCart = (productId) => {
  // {console.log('in delete cart');}
  return {
    type: "deleteFromCart",
    payload: productId,
  };
};

export const buyProducts = (product)=>{
    return{
      type : 'buyProducts',
      payload : product
    }
}