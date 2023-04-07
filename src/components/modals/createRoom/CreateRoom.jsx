import React, { useContext, useState } from 'react';
import { TokenContext, UserContext } from '../../../App';
import AddUsers from './AddUsers';
import SubmitNewRoom from './SubmitNewRoom';
import TopicsList from './TopicsList';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function CreateRoom({ toggleCreateRoom }) {
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);

  const [topic, setTopic] = useState('');
  const [users, setUsers] = useState([loggedInUser]);
  const [publicRoom, setPublicRoom] = useState(false);
  const [formStage, setFormStage] = useState('topic');

  const fetchCreateRoom = async () => {
    const body = new FormData();
    data.append('users', users);
    data.append('topic', topic);
    data.append('public', publicRoom);

    const res = await fetch(`${apiURL}/api/rooms`, {
      mode: 'cors',
      method: 'POST',
      body: body,
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    if (res.status === 200) {
      toggleCreateRoom();
    }
    const data = await res.json();
    console.log(res);
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
  const handleSubmitSelection = (bool) => {
    setPublicRoom(bool);
    fetchCreateRoom();
  };
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
      <p className='text-gray-500'>
        Your room is where you and your friends hang out. Create a room to start
        talking.
      </p>
      {stageOfForm()}
    </div>
  );
}

export default CreateRoom;
