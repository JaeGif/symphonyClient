import React from 'react';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
// displays user profile picture, and their username next to messages
function UserHead({ user, hover = true }) {
  return (
    <div
      className={
        hover
          ? 'flex gap-5 p-1 dark:hover:bg-gray-800 hover:bg-gray-300 rounded-sm items-center'
          : 'flex gap-5 p-1 rounded-sm items-center'
      }
    >
      <div className='h-10 w-10 overflow-hidden rounded-3xl'>
        <img className='h-10' src={`${apiURL}/${user.avatar}`} />
      </div>
      <p>{user.username}</p>
    </div>
  );
}

export default UserHead;
