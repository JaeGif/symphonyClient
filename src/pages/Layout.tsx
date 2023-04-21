import React, { useState } from 'react';
import { Outlet, useOutlet } from 'react-router';
import CreateRoom from '../components/modals/createRoom/CreateRoom';
import Sidebar from '../components/sidebar/Sidebar';
import { AnimatePresence } from 'framer-motion';
type LayoutProps = {
  refreshUserData: Function;
};
function Layout({ refreshUserData }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [createRoom, setCreateRoom] = useState<boolean>(false);
  const toggleCreateRoom = () => {
    setCreateRoom(!createRoom);
  };
  const closeCreateRoom = () => {
    if (createRoom) setCreateRoom(false);
  };
  const openCreateRoom = () => {
    if (!createRoom) setCreateRoom(true);
  };
  return (
    <div className={`${theme} relative`}>
      <AnimatePresence>
        {createRoom && (
          <CreateRoom
            openCreateRoom={openCreateRoom}
            closeCreateRoom={closeCreateRoom}
            toggleCreateRoom={toggleCreateRoom}
            refreshUserData={refreshUserData}
          />
        )}
      </AnimatePresence>
      <div
        className={`flex space-x-16 dark:bg-gray-700 dark:text-white bg-gray-200 h-screen w-screen overflow-hidden`}
      >
        <Sidebar
          createRoom={createRoom}
          openCreateRoom={openCreateRoom}
          theme={theme}
          setTheme={setTheme}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
