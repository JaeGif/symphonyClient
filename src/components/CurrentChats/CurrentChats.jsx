import React, { useContext } from 'react';
import { UserContext } from '../../App';
import mongoose from 'mongoose';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function CurrentChats() {
  const loggedInUser = useContext(UserContext);

  return (
    <div className='w-1/5 min-w-fit dark:bg-gray-800 shadow-sm'>
      CurrentChats
      {loggedInUser.rooms.map((roomId) => (
        <div>
          <p>Title</p>
          <Link to={`/messages/${roomId}`}>
            <div>_id: {roomId}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CurrentChats;
