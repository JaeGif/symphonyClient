import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../../App';
import UserHead from '../../users/UserHead';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function AddUsers({ handleUserSelection }) {
  const token = useContext(TokenContext);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');

  const searchUsers = async (e) => {
    const res = await fetch(`${apiURL}/api/users?q=${query}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data.users;
  };
  const updateQueryParams = (e) => {
    setQuery(e.target.value);
  };
  const searchUsersQuery = useQuery({
    queryKey: ['search', { q: query }],
    queryFn: searchUsers,
    enabled: Boolean(query),
  });

  useEffect(() => {
    console.log(searchUsersQuery.data);
  }, [searchUsersQuery.data]);
  return (
    <div className='w-full'>
      <p>Add people to the room.</p>
      <input
        onChange={(e) => updateQueryParams(e)}
        className='border-[1px] border-pink-500 rounded-sm p-1 w-full'
        type='text'
        placeholder='Add users'
      />
      <div>
        {searchUsersQuery.isFetched &&
          searchUsersQuery.data &&
          searchUsersQuery.data.map((user) => <UserHead user={user} />)}
      </div>
    </div>
  );
}

export default AddUsers;
