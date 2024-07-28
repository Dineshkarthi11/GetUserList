import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


// Async thunk to fetch users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://dummyjson.com/users'); // Fetching users from the dummy API
  const data = await response.json(); // Returning the users data
  return data.users;
});


// Creating users slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [], // Initial users state
    status: 'idle', // Initial status
    error: null, // Initial error state
    genderFilter: '', // Initial gender filter
    countryFilter: '',  // Initial country filter
  },
  reducers: {
    setGenderFilter: (state, action) => {
      state.genderFilter = action.payload; // Setting the gender filter
    },
    setCountryFilter: (state, action) => {
      state.countryFilter = action.payload; // Setting the country filter
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'; // Setting status to loading when the fetch is pending
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Setting status to succeeded when the fetch is fulfilled
        state.users = action.payload; // Storing the fetched users
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'; // Setting status to failed when the fetch is rejected
        state.error = action.error.message; // Storing the error message
      });
  },
});

export const { setGenderFilter, setCountryFilter } = usersSlice.actions;

export default usersSlice.reducer;
