// store needs only one root reducer
// we can use lots of reducer . ekch main  reducer pahije jyachya aat sagle reducer aastil. that main reducer we pass to store
// we need only one root reducer

import getToken, { setToken } from "../../HttpService/LocalStorageService";

// var initialState = { number: 0 };

// const changeNumber = (state = initialState, action) => {

// //   console.log(action.payload);

//   switch (action.type) {
//     case "INCREMENT":
//       return { number: action.payload };
//     case "DECREMENT":
//       return action.payload;
//     default:
//       return state;
//   }
// };

var initialState = 1;
const cartArr = JSON.parse(getToken("cart")) || [];
// const [cartArr, setCartArr] = useState([])

export const changeNumber = (state = initialState, action) => {
  console.log("in reducer");
  // console.log(action);

  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

export const addDataToCart = (state = cartArr, action) => {
  console.log("in addDataTocart");
  console.log(action);

  switch (action.type) {
    case "addToCart": {
      setToken("cart", JSON.stringify([...state, action.payload]));

      return [...state, action.payload];
    }
    case "INCREMENT":
      const plus = state.map((item) => {
        if (item._id === action.payload._id) {
          action.payload.quantity += 1;
          item = action.payload;
        }
        return item;
      });
      return plus;

    case "DECREMENT": {
      const updatedArray = state.map((product) => {
        if (product._id === action.payload._id) {
          product.quantity = action.payload.quantity - 1;
          // product=product.quantity
        }
        return product;
      });
      return updatedArray;
    }

    default:
      return cartArr;
  }
};
// export default changeNumber;
