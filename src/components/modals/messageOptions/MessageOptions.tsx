import React from 'react';

type MessageOptionsProps = {
  handleDelete: Function;
  openEdit: Function;
};
function MessageOptions({ handleDelete, openEdit }: MessageOptionsProps) {
  return (
    <div className='flex flex-col'>
      <button className='text-blue-500 bg-gray-700' onClick={() => openEdit()}>
        Edit
      </button>
      <button
        className='bg-gray-700 text-red-500'
        onCanPlayThrough={() => handleDelete()}
      >
        Delete
      </button>
    </div>
  );
}

export default MessageOptions;
