import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext, TokenContext } from '../App';
import RoomCard from '../components/details/RoomCard';
import Search from '../components/modals/createRoom/Search';
import { useOutlet } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import uniqid from 'uniqid';

import SearchResults from './SearchResults';

const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function Explore() {
  const topics = [
    'Gaming',
    'Study',
    'Friends',
    'Club',
    'Artists',
    'Community',
    'Other',
  ];
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState(null);
  const [topicQuery, setTopicQuery] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    let params = {};
    if (query) {
      params.title = query;
    }
    if (topicQuery) {
      params.topic = topicQuery;
    }
    setSearchParams(`?${new URLSearchParams(params)}`);
    if (query === '' && topicQuery === '') {
      setSearchParams({});
    }
  }, [query, topicQuery]);

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
  const getSearchResults = async () => {
    const res = await fetch(`${apiURL}/api/rooms?${searchParams}`, {
      mode: 'cors',
      method: 'GET',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json({});
    return data.rooms;
  };
  const searchRoomsQuery = useQuery({
    queryKey: ['rooms', { q: query }],
    queryFn: getSearchResults,
  });
  const handleSearching = (e) => {
    if (e.target.value !== '') {
      setSearching(true);
    }
  };
  const handleTopicSelection = (e, i) => {
    if (selected === i) {
      setSelected(null);
      setTopicQuery('');
    } else {
      setTopicQuery(e.target.textContent);
      setSelected(i);
    }
  };

  return (
    <div className='p-4 flex w-full items-center flex-col overflow-scroll gap-4'>
      <h1>Explore</h1>
      <div className='w-full flex items-end'>
        <div>
          <p>Search:</p>
          <Search
            setQuery={setQuery}
            handleSearching={handleSearching}
            setSearching={setSearching}
          />
        </div>
        <div className='flex flex-shrink gap-2 w-full pl-5'>
          {topics.map((topic, i) => (
            <div>
              <button
                key={uniqid()}
                id={uniqid()}
                onClick={(e) => {
                  handleTopicSelection(e, i);
                }}
                className={
                  i === selected
                    ? `p-2 pt-1 pb-1 bg-pink-500 rounded-md hover:bg-pink-600`
                    : `p-2 pt-1 pb-1 bg-blue-500 rounded-md hover:bg-blue-600`
                }
              >
                {topic}
              </button>
            </div>
          ))}
        </div>
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
          <>
            <h2>Relevant Rooms</h2>
            {searchParams &&
            searchRoomsQuery.data &&
            searchRoomsQuery.data.length !== 0 ? (
              <SearchResults data={searchRoomsQuery.data} />
            ) : (
              <h1>No rooms match your search.</h1>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Explore;
