import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './UsersLists';


// Configuring the Redux store
const store = configureStore({
  reducer: {
    users: usersReducer, // Adding users slice reducer to the store
  }, 
});

export default store;
