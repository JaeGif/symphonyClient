import React from 'react';
import { Outlet } from 'react-router';

function MessageLayout() {
  return (
    <div>
      MessageLayout
      <Outlet />
    </div>
  );
}

export default MessageLayout;
