import React, { useState } from 'react';
import { Outlet } from 'react-router';
import CreateRoom from '../components/modals/createRoom/CreateRoom';
import Sidebar from '../components/sidebar/Sidebar';

function Layout() {
  const [theme, setTheme] = useState('dark');
  const [createRoom, setCreateRoom] = useState(false);
  const toggleCreateRoom = () => {
    setCreateRoom(!createRoom);
  };

  return (
    <div className={`${theme} relative`}>
      {createRoom && <CreateRoom toggleCreateRoom={toggleCreateRoom} />}
      <div
        className={`flex space-x-16 dark:bg-gray-700 dark:text-white h-screen w-screen overflow-hidden`}
      >
        <Sidebar
          toggleCreateRoom={toggleCreateRoom}
          theme={theme}
          setTheme={setTheme}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
