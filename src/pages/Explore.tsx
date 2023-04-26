import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext, TokenContext } from '../App';
import Search from '../components/modals/createRoom/Search';
import { useSearchParams } from 'react-router-dom';
import uniqid from 'uniqid';

import SearchResults from './SearchResults';
import { Room } from '../utilities/Interfaces';

const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
type ExploreProps = {
  refreshUserData: Function;
};
function Explore({ refreshUserData }: ExploreProps) {
  const topics = [
    'Gaming',
    'Study',
    'Friends',
    'Club',
    'Artists',
    'Community',
    'Generic',
  ];
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams({});
  const [searching, setSearching] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [topicQuery, setTopicQuery] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    let params: {
      title?: string;
      topic?: string;
    } = {};
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

  const getPopular = async (): Promise<Room[]> => {
    const res = await fetch(
      `${apiURL}/api/rooms?popular=true&returnLimit=20&user=${user?._id}`,
      {
        mode: 'cors',
        headers: {
          Authorization: 'Bearer' + ' ' + token,
        },
      }
    );
    const data = await res.json();
    return data.rooms;
  };
  const popularRoomsQuery = useQuery({
    queryKey: ['rooms', { popular: true }],
    queryFn: getPopular,
  });
  const getSearchResults = async (): Promise<Room[]> => {
    let params: {
      title?: string;
      topic?: string;
    } = {};
    let searchQuery = '';
    if (query) {
      params.title = query;
      searchQuery = `title=${query}`;
    }
    if (topicQuery) {
      params.topic = topicQuery;
      if (!query) {
        searchQuery = `topic=${topicQuery}`;
      } else searchQuery += `&topic=${topicQuery}`;
    }

    const res = await fetch(`${apiURL}/api/rooms?${searchQuery}`, {
      mode: 'cors',
      method: 'GET',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.rooms;
  };
  const searchRoomsQuery = useQuery({
    queryKey: ['rooms', { q: query, t: topicQuery }],
    queryFn: getSearchResults,
  });
  const handleSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      setSearching(true);
    }
  };
  const handleTopicSelection = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    i: number
  ) => {
    if (selected === i) {
      setSelected(null);
      setTopicQuery('');
      if (query === '') {
        setSearching(false);
      }
    } else {
      const target = e.target as HTMLButtonElement;
      setTopicQuery(target.textContent || '');
      setSelected(i);
    }
    if (!searching) setSearching(true);
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
            <div key={uniqid()}>
              <button
                id={uniqid()}
                onClick={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
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
              <SearchResults
                refreshUserData={refreshUserData}
                data={popularRoomsQuery.data}
              />
            )}
          </>
        ) : (
          <>
            <h2>Relevant Rooms</h2>
            {searchRoomsQuery.data && searchRoomsQuery.data.length !== 0 ? (
              <SearchResults
                refreshUserData={refreshUserData}
                data={searchRoomsQuery.data}
              />
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
