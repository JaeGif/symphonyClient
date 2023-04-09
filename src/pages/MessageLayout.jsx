import React from 'react';
import { Outlet } from 'react-router';
import CurrentChats from '../components/currentChats/CurrentChats';

function MessageLayout() {
  return (
    <div className='flex w-screen'>
      <CurrentChats />
      <Outlet />
    </div>
  );
}

export default MessageLayout;
