import React, { useContext } from 'react';
import { Outlet, useParams } from 'react-router';
import { TokenContext } from '../App';
import { useQuery } from '@tanstack/react-query';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function UserLayout() {
  const userId = useParams();
  const token = useContext(TokenContext);
  const getUser = async () => {
    const res = await fetch(`${apiURL}/api/users/${userId.id}`, {
      mode: 'cors',
      method: 'GET',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.user;
  };
  const userQuery = useQuery({
    queryKey: ['users', { _id: userId }],
    queryFn: getUser,
  });
  return (
    <div className='p-6'>
      {/*       <h1>User Settings</h1>
       */}{' '}
      {userQuery.data && <Outlet context={userQuery.data} />}
    </div>
  );
}

export default UserLayout;
