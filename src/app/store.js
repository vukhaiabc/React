
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../feature/Counter/counterSlice'
import userReducer from '../feature/Auth/userSlice'

// const rootReducer = {
//     counter : counterReducer
// };
const store = configureStore({
    reducer : {
        counter : counterReducer,
        user : userReducer,
    }
});
export default store