import React from 'react';

function Header({
  threadName = 'Group Chat',
  description = 'This is a default description of a thread',
  users,
}) {
  return (
    <div className='debug flex p-1 text-center justify-start'>
      <div className='border-r-gray-600 border-solid border-r p-1.5'>
        <p className='font-semibold'>{threadName}</p>
      </div>
      <div className=' debug align-middle text-center p-1-5'>
        <p className='text-gray-500'>{description}</p>
      </div>
    </div>
  );
}

export default Header;
