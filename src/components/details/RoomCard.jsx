import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { UserContext, TokenContext } from '../../App';

const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function RoomCard({ room }) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);

  return (
    <div>
      {room.title} <p>{room.users.length}</p>
    </div>
  );
}

export default RoomCard;
