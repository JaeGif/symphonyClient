import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserContext, TokenContext } from '../../App';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
interface Room {
  users: string[];
  messages?: string[];
  public: boolean;
  topic: string;
  description?: string;
  title: string;
  avatar?: string;
}
type HeaderProps = {
  room: string | undefined;
};
function Header({ room }: HeaderProps) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const getRoom = async () => {
    const res = await fetch(`${apiURL}/api/rooms/${room}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.room;
  };
  const roomQuery = useQuery({
    queryKey: ['room', { _id: room }],
    queryFn: getRoom,
  });
  return (
    <div className='shadow-sm shadow-gray-800 flex p-1 content-center justify-start'>
      <div className='border-r-gray-600 border-solid border-r p-1.5'>
        {roomQuery.data && (
          <p className='font-semibold'>{roomQuery.data.title}</p>
        )}
      </div>
      <div className='flex content-center p-1.5'>
        {roomQuery.data && (
          <p className=' text-gray-500'>{roomQuery.data.description}</p>
        )}
      </div>
    </div>
  );
}

export default Header;
