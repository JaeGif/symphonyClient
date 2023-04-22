import { useQueries } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { TokenContext, UserContext } from '../App';
import UserHead from '../components/users/UserHead';
import { Room, User } from '../utilities/Interfaces';
import EditUser from '../components/users/EditUser';
import UserCard from '../components/users/UserCard';
import useIsCurrentUser from '../hooks/useIsCurrentUser';
type UserProfileProps = {
  logoutUser: Function;
};
function UserProfile({ logoutUser }: UserProfileProps) {
  const user = useOutletContext<User>();
  const profile = useParams();
  const isCurrentUser = useIsCurrentUser(user._id, profile.id!);

  return (
    <div className='flex'>
      <UserCard logoutUser={logoutUser} />
      {isCurrentUser && <EditUser />}
    </div>
  );
}

export default UserProfile;
