import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../../App';
import UserHead from '../../users/UserHead';
import uniqid from 'uniqid';
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
  const joinUser = (user) => {
    // no multiple users added at once
    for (let i = 0; i < users.length; i++) {
      if (user.username === users[i].username) {
        return;
      }
    }
    setUsers([...users, user]);
  };
  const removeFromList = (key) => {
    let usersObj = [...users];
    for (let i = 0; i < usersObj.length; i++) {
      console.log(users[i].key, key);
      if (usersObj[i].key === key) {
        usersObj.splice(i, 1);
        setUsers(usersObj);
        break;
      }
    }
  };
  useEffect(() => {
    console.log(searchUsersQuery.data);
  }, [searchUsersQuery.data]);
  useEffect(() => {
    console.log(users);
  }, [users]);
  return (
    <div className='w-full gap-1'>
      <p>Add people to the room.</p>
      <div className='flex gap-1 mb-1'>
        {users.length > 0 &&
          users.map((item) => (
            <div className='bg-blue-400 rounded-md p-1 flex gap-2 items-center'>
              <p>{item.user.username}</p>
              <img
                onClick={() => removeFromList(item.key)}
                className='h-5'
                src='/assets/favicons/close.svg'
              />
            </div>
          ))}
      </div>
      <input
        onChange={(e) => updateQueryParams(e)}
        className='border-[1px] border-pink-500 rounded-sm p-1 w-full'
        type='text'
        placeholder='Add users'
      />
      <div>
        {searchUsersQuery.isFetched &&
          searchUsersQuery.data &&
          searchUsersQuery.data.map((user) => (
            <div onClick={() => joinUser({ user: user, key: uniqid() })}>
              <UserHead user={user} />
            </div>
          ))}
      </div>
      <div className='flex justify-center'>
        <p className='w-fit cursor-pointer text-2xl text-blue-500 hover:text-blue-400'>
          Next
        </p>
      </div>
    </div>
  );
}

export default AddUsers;
