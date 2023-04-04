import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/sidebar/Sidebar';

function Layout() {
  const [theme, setTheme] = useState('dark');
  return (
    <div className={`${theme}`}>
      <div
        className={`flex space-x-16 dark:bg-gray-700 dark:text-white h-screen w-screen overflow-hidden`}
      >
        <Sidebar theme={theme} setTheme={setTheme} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
