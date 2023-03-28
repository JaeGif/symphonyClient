import React from 'react';
import { Outlet } from 'react-router';
import CurrentChats from '../components/CurrentChats/CurrentChats';
import Room from '../components/messaging/Room';
function MessageLayout() {
  return (
    <div>
      <CurrentChats />
      <Room />
      <Outlet />
    </div>
  );
}

export default MessageLayout;
