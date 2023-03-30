import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/sidebar/Sidebar';

function Layout() {
  const [theme, setTheme] = useState('light');
  return (
    <div className={`${theme}`}>
      <div
        className={`flex space-x-16 dark:bg-gray-800 dark:text-white h-screen w-screen`}
      >
        <Sidebar theme={theme} setTheme={setTheme} />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
