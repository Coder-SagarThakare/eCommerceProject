// store needs only one root reducer
// we can use lots of reducer . ekch main  reducer pahije jyachya aat sagle reducer aastil. that main reducer we pass to store
// we need only one root reducer

import {changeNumber,addDataToCart} from "../Reducers/reducer";
import {combineReducers} from 'redux'

console.log('in main reducer');

const rootReducer=  combineReducers({
    changeNumber : changeNumber,
    dataAddedToCart: addDataToCart
})  

export default rootReducer;