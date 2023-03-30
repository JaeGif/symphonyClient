import React from 'react';

function Header({
  threadName = 'Group Chat',
  description = 'This is a default description of a thread',
  users,
}) {
  return (
    <div className='shadow-md shadow-gray-800 flex p-1 content-center justify-start'>
      <div className='border-r-gray-600 border-solid border-r p-1.5'>
        <p className='font-semibold'>{threadName}</p>
      </div>
      <div className='flex content-center p-1.5'>
        <p className=' text-gray-500'>{description}</p>
      </div>
    </div>
  );
}

export default Header;
