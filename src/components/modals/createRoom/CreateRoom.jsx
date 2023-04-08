import React, { useContext, useEffect, useState } from 'react';
import { TokenContext, UserContext } from '../../../App';
import { useNavigate } from 'react-router';
import AddUsers from './AddUsers';
import SubmitNewRoom from './SubmitNewRoom';
import TopicsList from './TopicsList';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function CreateRoom({ toggleCreateRoom, refreshUserData }) {
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  const [topic, setTopic] = useState('');
  const [users, setUsers] = useState();
  const [publicRoom, setPublicRoom] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [formStage, setFormStage] = useState('topic');

  const fetchCreateRoom = async () => {
    let input = {
      users: JSON.stringify(users),
      topic: topic,
      title: roomName,
      public: publicRoom,
    };
    console.log(input);

    const res = await fetch(`${apiURL}/api/rooms`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      refreshUserData();
      toggleCreateRoom();
      navigate(`/messages/${data.room}`);
    }
  };
  const stageOfForm = () => {
    switch (formStage) {
      case 'topic':
        return <TopicsList handleTopicSelection={handleTopicSelection} />;
      case 'users':
        return <AddUsers handleUsersSelection={handleUsersSelection} />;
      case 'submit':
        return <SubmitNewRoom handleSubmitSelection={handleSubmitSelection} />;
      default:
        return <TopicsList handleTopicSelection={handleTopicSelection} />;
    }
  };
  const handleTopicSelection = (title) => {
    setTopic(title);
    changeToUsers();
  };
  const handleUsersSelection = (usersList) => {
    setUsers(usersList);
    changeToSubmit();
  };
  const handleSubmitSelection = (title, bool) => {
    setRoomName(title);
    setPublicRoom(bool);
  };
  useEffect(() => {
    if (roomName && typeof publicRoom === 'boolean') {
      fetchCreateRoom();
    }
  }, [roomName, publicRoom]);

  const changeToUsers = () => {
    setFormStage('users');
  };
  const changeToSubmit = () => {
    setFormStage('submit');
  };
  const changeToTopic = () => {
    setFormStage('topic');
  };
  return (
    <div className='max-h-[70vh] min-w-[30vw] absolute z-10 bg-white top-[15vh] left-[calc(35vw)] p-5 flex items-center flex-col rounded-md'>
      <span
        onClick={() => toggleCreateRoom()}
        className='absolute top-3 right-3 cursor-pointer'
      >
        <img className='h-10' src='/assets/favicons/close-grey.svg' />
      </span>
      <h1>Create a room</h1>
      <p className='text-gray-500 mb-1'>
        Your room is where you and your friends hang out. Create a room to start
        talking.
      </p>
      {stageOfForm()}
    </div>
  );
}

export default CreateRoom;
