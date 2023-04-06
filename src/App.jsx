import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Layout from './pages/Layout';
import MessageLayout from './pages/MessageLayout';
import Room from './pages/Room';
import UserLayout from './pages/UserLayout';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import Error404 from './pages/Error404';
const UserContext = React.createContext(null);
const TokenContext = React.createContext(null);

function App() {
  const [loggedInUser, setLoggedInUser] = useState({}); // Stores user data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Boolean for conditionally showing login routes
  const [loginStatus, setLoginStatus] = useState(0);
  const [checkedLoginState, setCheckedLoginState] = useState(false);
  const [token, setToken] = useState(null);

  const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const data = JSON.parse(loggedUserJSON);
      parseJwt(data);
    }
    setCheckedLoginState(true);
  }, []);
  const parseJwt = (data) => {
    const decode = JSON.parse(atob(data.token.split('.')[1]));
    if (decode.expire * 1000 < new Date().getTime()) {
      clearExpiredData();
      console.log('Token Expired');
    } else {
      setLoggedInUser(data.user);
      setToken(data.token);
      setIsLoggedIn(true);
    }
  };
  const clearExpiredData = () => {
    localStorage.clear();
  };
  const fetchUserData = async (id, token) => {
    const res = await fetch(`${apiURL}/api/users/${id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    setLoggedInUser(data.user);
    setIsLoggedIn(true);
    navigate('/', { replace: true });
    window.localStorage.setItem(
      'user',
      JSON.stringify({ user: data.user, token: token })
    );
  };
  const loginUser = async (username, password, isGuest = false) => {
    const userData = new URLSearchParams();
    userData.append('username', username);
    userData.append('password', password);
    const res = await fetch(`${apiURL}/login`, {
      mode: 'cors',
      method: 'POST',
      body: userData,
    });
    setLoginStatus(res.status);
    const data = await res.json();
    setToken(data.token);
    fetchUserData(data.user, data.token);
  };

  const registerUser = () => {
    // to be completed
  };

  return (
    <UserContext.Provider value={loggedInUser}>
      <TokenContext.Provider value={token}>
        {checkedLoginState && (
          <Routes>
            <Route
              path='/login'
              element={
                <Login loginUser={loginUser} loginStatus={loginStatus} />
              }
            />
            <Route path='/register' element={<Register />} />
            {isLoggedIn ? (
              <Route exact path='/' element={<Layout />}>
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
        )}
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export { App, UserContext, TokenContext };
