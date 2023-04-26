import React from 'react';
import RoomCard from '../components/details/RoomCard';
import uniqid from 'uniqid';
import { Room } from '../utilities/Interfaces';
type SearchResultsProps = {
  data: Room[];
  refreshUserData: Function;
};
function SearchResults({ data, refreshUserData }: SearchResultsProps) {
  return (
    <div>
      <div className='flex justify-center h-full w-full'>
        <div className='grid grid-cols-fluid grid-rows-3 h-full w-full gap-y-4 gap-x-1'>
          {data.map((room) => (
            <RoomCard
              key={uniqid()}
              refreshUserData={refreshUserData}
              room={room}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
