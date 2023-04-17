import React from 'react';
import RoomCard from '../components/details/RoomCard';

function SearchResults({ data, refreshUserData }) {
  return (
    <div>
      <div className='flex justify-center h-full w-full'>
        <div className='grid grid-cols-fluid grid-rows-3 h-full w-full gap-y-4 gap-x-1'>
          {data.map((room) => (
            <RoomCard refreshUserData={refreshUserData} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
