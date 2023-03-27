import React from 'react';
import { Outlet } from 'react-router';

function Layout() {
  return (
    <div>
      Layout
      <Outlet />
    </div>
  );
}

export default Layout;
