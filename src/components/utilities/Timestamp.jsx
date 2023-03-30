import React from 'react';

function Timestamp({ timestamp, username }) {
  return (
    <div className='flex gap-2'>
      <p>
        <em className='font-bold text-pink-500'>{username}</em>
      </p>
      <p>
        <em className='text-xs text-gray-400'>{timestamp}</em>
      </p>
    </div>
  );
}

export default Timestamp;
