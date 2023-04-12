import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { UserContext, TokenContext } from '../App';
import RoomCard from '../components/details/RoomCard';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function Explore({}) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  const getPopular = async () => {
    const res = await fetch(`${apiURL}/api/rooms?popular=true`, {
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
    <div className='p-4 flex w-full h-full items-center flex-col debug'>
      <h1>Explore</h1>
      <div className='w-full debug'>
        <h2>Popular Rooms</h2>
        {popularRoomsQuery.data &&
          popularRoomsQuery.data.map((room) => <RoomCard room={room} />)}
      </div>
    </div>
  );
}

export default Explore;
