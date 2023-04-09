import React from 'react';
import { useParams } from 'react-router';
import Room from '../../pages/Room';

function RoomMountingWrapper() {
  const { id } = useParams();
  return <Room key={id} />;
}

export default RoomMountingWrapper;
