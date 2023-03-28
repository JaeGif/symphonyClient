import React, { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar/Sidebar';

function Layout() {
  const [theme, setTheme] = useState('light');
  return (
    <div className={`flex ${theme} space-x-44`}>
      <Sidebar theme={theme} setTheme={setTheme} />
      <Outlet />
    </div>
  );
}

export default Layout;
