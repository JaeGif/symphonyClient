import React, { useState } from 'react';
import { Outlet, useOutlet } from 'react-router';
import CreateRoom from '../components/modals/createRoom/CreateRoom';
import Sidebar from '../components/sidebar/Sidebar';
import { AnimatePresence } from 'framer-motion';
type LayoutProps = {
  refreshUserData: Function;
};
function Layout({ refreshUserData }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [createRoom, setCreateRoom] = useState<boolean>(false);
  const toggleCreateRoom = () => {
    setCreateRoom(!createRoom);
  };

  return (
    <div className={`${theme} relative`}>
      <AnimatePresence>
        {createRoom && (
          <CreateRoom
            toggleCreateRoom={toggleCreateRoom}
            refreshUserData={refreshUserData}
          />
        )}
      </AnimatePresence>
      <div
        className={`flex space-x-16 dark:bg-gray-700 dark:text-white bg-gray-200 h-screen w-screen overflow-hidden`}
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
