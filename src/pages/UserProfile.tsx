import { useQueries } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';
import { TokenContext, UserContext } from '../App';
import UserHead from '../components/users/UserHead';
import { Room, User } from '../types/Interfaces';
import EditUser from '../components/users/EditUser';
import UserCard from '../components/users/UserCard';
import useIsCurrentUser from '../hooks/useIsCurrentUser';
type UserProfileProps = {
  logoutUser: Function;
  refreshUserData: Function;
};
function UserProfile({ logoutUser, refreshUserData }: UserProfileProps) {
  const user = useContext(UserContext);
  const profile = useParams();
  const isCurrentUser = useIsCurrentUser(user!._id, profile.id!);

  return (
    <div className='flex max-h-[calc(100vh-4rem)] gap-4 flex-col sm:flex-row overflow-y-scroll'>
      <UserCard logoutUser={logoutUser} />
      {isCurrentUser && <EditUser refreshUserData={refreshUserData} />}
    </div>
  );
}

export default UserProfile;
