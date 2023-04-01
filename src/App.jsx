import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import Layout from './pages/Layout';
import MessageLayout from './pages/MessageLayout';
import Room from './pages/Room';
import UserLayout from './pages/UserLayout';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Error404 from './pages/Error404';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({}); // Stores user data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean for conditionally showing login routes

  const loginUser = (isGuest = false) => {};
  const registerUser = () => {};
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {isLoggedIn ? (
          <Route path='/' element={<Layout />}>
            <Route path='messages' element={<MessageLayout />}>
              <Route path=':id' element={<Room />} />
            </Route>
            <Route path='profile' element={<UserLayout />}>
              <Route path=':id' element={<UserProfile />} />
            </Route>
          </Route>
        ) : (
          <Route path='*' element={<Navigate to='/login' />} />
        )}
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
