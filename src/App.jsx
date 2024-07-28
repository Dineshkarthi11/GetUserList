import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setGenderFilter, setCountryFilter } from './UsersLists';
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  // Selectors to get users, gender filter, and country filter from the Redux store.
  const users = useSelector((state) => state.users.users);
  const genderFilter = useSelector((state) => state.users.genderFilter);
  const countryFilter = useSelector((state) => state.users.countryFilter);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;  // Number of users to display per page

  // Fetch users when the component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);


  // Filter users based on selected gender and country
  const filteredUsers = users.filter((user) => {
    return (
      (genderFilter ? user.gender === genderFilter : true) &&
      (countryFilter ? user.address.country === countryFilter : true)
    );
  });


  // Event handler for gender filter change
  const handleGenderChange = (e) => {
    dispatch(setGenderFilter(e.target.value));
  };


   // Event handler for country filter change
  const handleCountryChange = (e) => {
    dispatch(setCountryFilter(e.target.value));
  };


  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


  // Event handler for changing the page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  // Event handler for the previous page button
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  // Event handler for the next page button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">Employees </div>
        <div className="filters">
          <select onChange={handleGenderChange} value={genderFilter}>
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select onChange={handleCountryChange} value={countryFilter}>
            <option value="">All Countries</option>
            {Array.from(new Set(users.map((user) => user.address.country))).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main>
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Full Name</th>
              <th>Demography</th>
              <th>Designation</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td><img src={user.image} alt={user.fullName} className="user-image" /></td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.gender}/{user.age}</td>
                <td>{user.company.title}</td>
                <td>{user.address.city}, {user.address.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`control ${currentPage === 1 ? 'disabled' : ''}`}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`control ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
