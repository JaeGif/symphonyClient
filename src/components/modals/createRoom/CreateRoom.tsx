import React, { useContext, useEffect, useState, useRef } from 'react';
import { TokenContext, UserContext } from '../../../App';
import { useNavigate } from 'react-router';
import AddUsers from './AddUsers';
import SubmitNewRoom from './SubmitNewRoom';
import TopicsList from './TopicsList';
import uniqid from 'uniqid';
import { motion } from 'framer-motion';

const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;
type CreateRoomProps = {
  toggleCreateRoom: Function;
  refreshUserData: Function;
  openCreateRoom: Function;
  closeCreateRoom: Function;
};
function CreateRoom({
  toggleCreateRoom,
  refreshUserData,
  openCreateRoom,
  closeCreateRoom,
}: CreateRoomProps) {
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const navigate = useNavigate();

  const [topic, setTopic] = useState<string>('');
  const [users, setUsers] = useState<string[]>();
  const [publicRoom, setPublicRoom] = useState<boolean | null>(null);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [formStage, setFormStage] = useState('topic');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeCreateRoom();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const fetchCreateRoom = async () => {
    let input = {
      users: JSON.stringify(users),
      topic: topic,
      title: roomName,
      public: publicRoom,
      description: description,
    };

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
      closeCreateRoom();
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
  const handleTopicSelection = (title: string) => {
    setTopic(title);
    changeToUsers();
  };
  const handleUsersSelection = (usersList: string[]) => {
    setUsers(usersList);
    changeToSubmit();
  };
  const handleSubmitSelection = (
    title: string,
    bool: boolean,
    desc: string
  ) => {
    if (title) {
      setRoomName(title);
      setPublicRoom(bool);
      setDescription(desc);
    }
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
    <motion.div
      ref={ref}
      key={uniqid()}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
      className='max-h-[70vh] min-w-[30vw] absolute z-10 bg-white top-[15vh] left-[calc(35vw)] p-5 flex items-center flex-col rounded-md'
    >
      <span
        onClick={() => closeCreateRoom()}
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
    </motion.div>
  );
}

export default CreateRoom;
