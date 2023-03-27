import React from 'react';
import { Outlet } from 'react-router';

function UserLayout() {
  return (
    <div>
      UserLayout
      <Outlet />
    </div>
  );
}

export default UserLayout;
