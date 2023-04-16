import { useQueries } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useOutletContext } from 'react-router';
import { TokenContext } from '../App';
import UserHead from '../components/users/UserHead';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function UserProfile() {
  const token = useContext(TokenContext);
  const user = useOutletContext();
  const rooms = user.rooms;

  const getRooms = async (room) => {
    console.log(room.queryKey[1]._id);
    const res = await fetch(`${apiURL}/api/rooms/${room.queryKey[1]._id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.room;
  };
  const userRooms = useQueries({
    queries: rooms.map((room) => ({
      queryKey: ['room', { _id: room }],
      queryFn: (room) => getRooms(room),
    })),
  });
  return (
    <div className='bg-gray-900 rounded-lg p-4'>
      <UserHead user={user} />
      {user.isModerator && (
        <div>
          <p>Admin</p>
        </div>
      )}
      {user.bio !== '' && (
        <div className='flex flex-col'>
          <p className='border-b-[1px] border-black'>About</p>
          <p>{user.bio}</p>
        </div>
      )}
      {user.rooms.length !== 0 && (
        <div>
          <p className='border-b-[1px] border-black'>Active Rooms</p>
          <div className='gap-1 overflow-scroll flex'>
            {userRooms.map((room) => (
              <div className='bg-blue-500 rounded-sm p-1 flex gap-1'>
                {room.data.avatar ? (
                  <div className='h-6 w-6 rounded-3xl overflow-hidden'>
                    <img className='h-6 w-6' src={room.data.avatar} />
                  </div>
                ) : (
                  <div className='h-6 w-6 rounded-3xl overflow-hidden'>
                    <img className='h-6 w-6' src='/assets/favicons/study.png' />
                  </div>
                )}
                <p>{room.data.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
