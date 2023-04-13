import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { UserContext, TokenContext } from '../App';
import RoomCard from '../components/details/RoomCard';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function Explore({}) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  const getPopular = async () => {
    const res = await fetch(`${apiURL}/api/rooms?popular=true&returnLimit=9`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json({});
    return data.rooms;
  };
  const popularRoomsQuery = useQuery({
    queryKey: ['rooms', { popular: true }],
    queryFn: getPopular,
  });
  return (
    <div className='p-4 flex w-full items-center flex-col overflow-scroll'>
      <h1>Explore</h1>
      <div>Search</div>
      <div className='w-full'>
        <h2>Popular Rooms</h2>
        <div className='flex justify-center h-full w-full'>
          <div className='grid grid-cols-fluid grid-rows-3 h-full w-full gap-y-4 gap-x-1'>
            {popularRoomsQuery.data &&
              popularRoomsQuery.data.map((room) => <RoomCard room={room} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
