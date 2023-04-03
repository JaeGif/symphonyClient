import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
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
  const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setLoggedInUser(user);
      setIsLoggedIn(true);
      /*      
      setToken(user.token); */
    }
  }, []);
  const fetchUserData = async (id, token) => {
    const res = await fetch(`${apiURL}/api/users/${id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    setLoggedInUser(loggedInUser);
    setIsLoggedIn(true);
    navigate('/', { replace: true });
    window.localStorage.setItem(
      'user',
      JSON.stringify({ ...data.user, token: token })
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
    const data = await res.json();
    console.log(data);
    fetchUserData(data.user, data.token);
  };

  const registerUser = () => {
    // to be completed
  };

  return (
    <Routes>
      <Route path='/login' element={<Login loginUser={loginUser} />} />
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
  );
}

export default App;
