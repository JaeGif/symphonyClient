import React, { useContext, useRef, useState, useEffect } from 'react';
import { TokenContext, UserContext } from '../../App';
import style from './options.module.css';

const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function OptionsEllipses({ room, size, refreshUserData }) {
  const token = useContext(TokenContext);
  const loggedInUser = useContext(UserContext);
  const [isToggled, setIsToggled] = useState(false);
  const ref = useRef(null);

  const handleRemoveUser = async () => {
    const data = { order: 'userLeaving', user: loggedInUser._id, room: room };
    const res = await fetch(`${apiURL}/api/rooms/${room}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
    });
    const userRes = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200 && userRes.status === 200) {
      refreshUserData();
      handleClose();
      document.removeEventListener('click', handleClickOutside, true);
    } else if (res.status !== 200) {
      const jsonData = await res.json();
    }
  };
  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsToggled(true);
  };
  const handleClose = (e) => {
    setIsToggled(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <div
      onClick={(e) => {
        handleOpen(e);
      }}
    >
      {
        <div
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={
            isToggled
              ? `visible left-0 absolute top-0 bg-gray-950 w-full p-6 hover:bg-red-500`
              : 'invisible absolute top-0 w-full p-6'
          }
        >
          <p
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemoveUser();
            }}
            type='button'
          >
            Leave
          </p>
        </div>
      }
      <img className={size} src={`/assets/favicons/ellipses.svg`} />
    </div>
  );
}

export default OptionsEllipses;
