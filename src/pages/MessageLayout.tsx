import React from 'react';
import { Outlet, useOutlet } from 'react-router';
import CurrentChats from '../components/currentChats/CurrentChats';
import OpenChatMessage from '../components/utilities/OpenChatMessage';
type MessageLayoutProps = {
  refreshUserData: Function;
};
function MessageLayout({ refreshUserData }: MessageLayoutProps) {
  const outlet = useOutlet();
  return (
    <div className='flex w-screen'>
      <CurrentChats refreshUserData={refreshUserData} />
      {outlet || <OpenChatMessage />}
    </div>
  );
}

export default MessageLayout;
