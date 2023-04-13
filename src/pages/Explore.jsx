import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { UserContext, TokenContext } from '../App';
import RoomCard from '../components/details/RoomCard';
import Search from '../components/modals/createRoom/Search';
import { useOutlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';

import SearchResults from './SearchResults';

const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function Explore({}) {
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const history = useHistory('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState();

  useEffect(() => {
    if (query !== '') {
      setSearchParams(`?${new URLSearchParams({ paramName: query })}`);
    }
  }, [query]);

  const getPopular = async () => {
    const res = await fetch(`${apiURL}/api/rooms?popular=true&returnLimit=9`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json({});
    return data.rooms;
  };
  const popularRoomsQuery = useQuery({
    queryKey: ['rooms', { popular: true }],
    queryFn: getPopular,
  });
  return (
    <div className='p-4 flex w-full items-center flex-col overflow-scroll gap-4'>
      <h1>Explore</h1>
      <div className='w-full'>
        <p>Search:</p>
        <Search setQuery={setQuery} />
      </div>
      <div className='w-full'>
        {!searching ? (
          <>
            <h2>Popular Rooms</h2>
            {popularRoomsQuery.data && (
              <SearchResults data={popularRoomsQuery.data} />
            )}
          </>
        ) : (
          <p>Data</p>
        )}
      </div>
    </div>
  );
}

export default Explore;
