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
    <div className='dark:bg-gray-900 bg-white rounded-lg p-4 dark:text-white max-w-xl'>
      <UserHead hover={false} user={user} />
      {user.isModerator && (
        <div>
          <h3 className='w-fit m-2 text-blue-400'>Roles</h3>
          <div className='dark:bg-gray-950 bg-gray-100 p-3 rounded-md'>
            <p>Admin</p>
          </div>
        </div>
      )}
      {user.bio !== '' && (
        <div className='flex flex-col'>
          <h3 className='w-fit m-2 text-blue-400'>About</h3>
          <div className='dark:bg-gray-950 bg-gray-100 p-3 rounded-md max-h-80 overflow-scroll'>
            <p>{user.bio}</p>
          </div>
        </div>
      )}
      {user.website !== '' && (
        <div className='flex flex-col'>
          <h3 className='w-fit m-2 text-blue-400'>Personal Site</h3>
          <div className='dark:bg-gray-950 bg-gray-100 p-3 rounded-md'>
            <a href={`${user.website}`} rel='noreferrer' target='_blank'>
              {user.website}
            </a>
          </div>
        </div>
      )}
      {user.rooms.length !== 0 && (
        <div>
          <h3 className='text-blue-400 w-fit m-2'>Active Rooms</h3>
          <div className='gap-1 overflow-scroll flex'>
            {userRooms.map(
              (room) =>
                room.data && (
                  <div className='dark:bg-gray-700 bg-gray-100 rounded-sm p-1 flex gap-1 min-w-fit'>
                    {room.data.avatar ? (
                      <div className='h-6 w-6 rounded-3xl overflow-hidden'>
                        <img className='h-6 w-6' src={room.data.avatar} />
                      </div>
                    ) : (
                      <div className='h-6 w-6 rounded-3xl overflow-hidden'>
                        <img
                          className='h-6 w-6'
                          src='/assets/favicons/study.png'
                        />
                      </div>
                    )}
                    <p>{room.data.title}</p>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
