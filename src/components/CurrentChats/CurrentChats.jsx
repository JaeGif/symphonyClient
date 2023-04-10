import React, { useContext, useEffect } from 'react';
import { TokenContext, UserContext } from '../../App';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loading-icons';

const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function CurrentChats() {
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const roomParam = useParams();

  const fetchRoom = async (room) => {
    const res = await fetch(`${apiURL}/api/rooms/${room}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data.room;
  };
  const roomsQueries = useQueries({
    queries: loggedInUser.rooms.map((room) => {
      return {
        queryKey: ['room', { _id: room }],
        queryFn: () => fetchRoom(room),
      };
    }),
  });

  return (
    <div
      style={{ transform: 'scaleX(-1)' }}
      className={`w-1/5 min-w-fit dark:bg-gray-800 shadow-sm overflow-scroll`}
    >
      {roomsQueries.map((query) =>
        query.isSuccess ? (
          <Link to={`/messages/${query.data._id}`}>
            <div
              style={{ transform: 'scaleX(-1)' }}
              className={
                roomParam.id == query.data._id
                  ? `p-5 hover:bg-gray-900 cursor-pointer border-r-blue-500 border-r-4 rounded-sm flex justify-between items-center`
                  : 'p-5 hover:bg-gray-900 cursor-pointer flex justify-between items-center'
              }
            >
              <p className={roomParam.id == query.data._id && `text-pink-500`}>
                {query.data.title}
              </p>
              <img className='h-8' src='/assets/favicons/ellipses.svg' />
            </div>
          </Link>
        ) : (
          <div className='p-5 hover:bg-gray-900 cursor-pointer flex justify-center items-center'>
            <BallTriangle stroke='#ec4899' className='h-6' />
          </div>
        )
      )}
    </div>
  );
}
export default CurrentChats;
