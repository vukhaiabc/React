
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../feature/Counter/counterSlice'
import userReducer from '../feature/Auth/userSlice'
import cartReducer from '../feature/Cart/cartSlice';

// const rootReducer = {
//     counter : counterReducer
// };
const store = configureStore({
    reducer : {
        counter : counterReducer,
        user : userReducer,
        cart : cartReducer,
    }
});
export default store