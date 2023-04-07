import React from 'react';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
// displays user profile picture, and their username next to messages
function UserHead({ user }) {
  return (
    <div className='flex gap-5 p-1 hover:bg-gray-300 rounded-sm items-center'>
      <img className='h-5' src={`${apiURL}/${user.avatar}`} />
      <p>{user.username}</p>
    </div>
  );
}

export default UserHead;
