import React, { useState } from 'react';
function ChangeUserInformation() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avatar, setAvatar] = useState<File>();

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target;
    email.setCustomValidity('');
    if (email.checkValidity()) {
      console.log('checking email');
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (pattern.test(email.value)) {
        email.setCustomValidity('');
        setEmail(e.target.value);
      } else {
        email.setCustomValidity('Please enter a valid email address.');
        email.reportValidity();
      }
    }
  };
  return (
    <div>
      <div>
        <label>Email</label>
        <input onChange={(e) => validateEmail(e)} type='email' />
      </div>
      <div>
        <label>Bio</label>
        <input onChange={(e) => validateEmail(e)} type='email' />
      </div>
      <div>
        <label></label>
        <input onChange={(e) => validateEmail(e)} type='email' />
      </div>
    </div>
  );
}

export default ChangeUserInformation;
