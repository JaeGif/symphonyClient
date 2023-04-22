import React, { useState } from 'react';

function ChangePassword() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  function validatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const password = e.target;
    password.setCustomValidity('');

    if (password.checkValidity()) {
      const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
      if (pattern.test(password.value)) {
        password.setCustomValidity('');
        setPassword(e.target.value);
      } else {
        password.setCustomValidity(
          'Minimum six characters, at least one uppercase letter, one lowercase letter, and one number.'
        );
        password.reportValidity();
      }
    }
  }
  function matchPasswords(e: React.ChangeEvent<HTMLInputElement>) {
    const firstPassword = password;
    const confirmPassword = e.target;
    confirmPassword.setCustomValidity('');
    if (firstPassword === confirmPassword.value) {
      confirmPassword.setCustomValidity('');
      setConfirmPassword(e.target.value);
    } else {
      confirmPassword.setCustomValidity('Passwords do not match.');
      confirmPassword.reportValidity();
    }
  }
  return (
    <div>
      <div>
        <label>New Password</label>
        <input onChange={(e) => validatePassword(e)} type='password' />
      </div>
      <div>
        <label>Confirm Password</label>
        <input onChange={(e) => matchPasswords(e)} type='password' />
      </div>
    </div>
  );
}

export default ChangePassword;
