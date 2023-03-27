import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import MessageLayout from './pages/MessageLayout';
import MessageRoom from './pages/MessageRoom';
import UserLayout from './pages/UserLayout';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='messages' element={<MessageLayout />}>
            <Route path=':id' element={<MessageRoom />} />
          </Route>
          <Route path='profile' element={<UserLayout />}>
            <Route path=':id' element={<UserProfile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
