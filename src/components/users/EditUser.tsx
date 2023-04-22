import React, { useState } from 'react';
import ChangeUserInformation from './ChangeUserInformation';

function EditUser() {
  const [openTab, setOpenTab] = useState<'info' | 'password'>('info');

  return (
    <div className='flex justify-evenly debug'>
      <div>
        <p>Profile</p>
      </div>
      <div>
        <p>Password</p>
      </div>
      {openTab === 'info' && <ChangeUserInformation />}
      {openTab === 'password' && <ChangeUserInformation />}
    </div>
  );
}

export default EditUser;
