import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { UserContext, TokenContext } from '../../App';

const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function RoomCard({ room, refreshUserData }) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const joinRoomPut = async () => {
    const payload = {
      user: user._id,
      room: room._id,
      order: 'userJoining',
    };
    const resRoom = await fetch(`${apiURL}/api/rooms/${room._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const resUser = await fetch(`${apiURL}/api/users/${user._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(payload),
    });
    const roomData = await resRoom.json();
    const userData = await resUser.json();
    console.log(roomData, userData);
    refreshUserData();
  };

  return (
    <div className='flex flex-col justify-between dark:bg-gray-950 bg-gray-100 w-80 h-36 rounded-md p-4 shadow-md border-l-4 border-blue-500'>
      <div className='flex gap-2'>
        <div className='w-12 h-12 rounded-3xl bg-gray-900 overflow-hidden'>
          <img className='w-12 h-12' alt='img' />
        </div>
        <div className='w-[calc(100%-3rem)]'>
          <span className='flex justify-between'>
            <p>{room.title}</p>
            <em className='text-sm'>{room.topic}</em>
          </span>
          <p>Members: {room.users.length}</p>
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={joinRoomPut}
          className='bg-pink-500 w-fit p-6 pt-2 pb-2 rounded-md hover:bg-pink-700 hover:text-black text-white'
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default RoomCard;
