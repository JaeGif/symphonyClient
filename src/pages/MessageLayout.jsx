import React from 'react';
import { Outlet } from 'react-router';
import CurrentChats from '../components/currentChats/CurrentChats';
import Room from './Room';

function MessageLayout() {
  return (
    <div className='debug flex w-screen'>
      <CurrentChats />
      <Room />
      <Outlet />
    </div>
  );
}

export default MessageLayout;
