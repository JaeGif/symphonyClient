import React, { useContext } from 'react';
import { Navigate, useParams } from 'react-router';
import { UserContext } from '../../App';
import Error404 from '../../pages/Error404';
import Room from '../../pages/Room';

function RoomMountingWrapper() {
  const user = useContext(UserContext);
  const { id } = useParams();
  const isMember = () => {
    for (let i = 0; i < user.rooms.length; i++) {
      if (user.rooms[i] === id) return true;
    }
    return false;
  };
  return <>{isMember() ? <Room key={id} /> : <Error404 />}</>;
}

export default RoomMountingWrapper;
