import React, { useContext, useEffect, useState } from 'react';
import gfm from 'remark-gfm'; // GH flavored markdown plugin
import remarkGemoji from 'remark-gemoji';
import ReactMarkdown from 'react-markdown';
import UserHead from '../users/UserHead';
import Timestamp from '../utilities/Timestamp';
import { MessageType } from '../../utilities/Interfaces';
import { TokenContext, UserContext } from '../../App';
import { useMutation } from '@tanstack/react-query';
import MessageOptions from '../modals/messageOptions/MessageOptions';
import { AnimatePresence } from 'framer-motion';
const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;

type MessageProps = {
  message: MessageType;
};

function Message({ message }: MessageProps) {
  const token = useContext(TokenContext);
  const user = useContext(UserContext);
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);

  const deleteMessage = async () => {
    const res = await fetch(`${apiURL}/api/messages/${message._id}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
  };
  const putMessage = async (edits: string) => {
    const editData = {
      message: edits,
    };
    const res = await fetch(`${apiURL}/api/messages/${message._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(editData),
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
  };
  const deleteMutation = useMutation({
    mutationKey: ['deleteMessage'],
    mutationFn: deleteMessage,
  });
  const editMutatation = useMutation({
    mutationKey: ['editMessage'],
    mutationFn: putMessage,
  });
  const handleDelete = () => {
    deleteMutation;
  };
  const openEdit = () => {};
  return (
    <div className={`flex hover:dark:bg-gray-800 p-3 justify-between relative`}>
      <div className='flex gap-2 items-center'>
        <UserHead hover={false} user={message.user!} size={'md'} />
        <div>
          <Timestamp
            timestamp={message.timestamp}
            username={message.user!.username}
          />
          <ReactMarkdown remarkPlugins={[gfm, remarkGemoji]}>
            {message.message!}
          </ReactMarkdown>
        </div>
      </div>
      {user?._id === message.user?._id && !visibleOptions && (
        <img
          className='hover:cursor-pointer'
          onClick={() => setVisibleOptions(true)}
          src='/assets/favicons/ellipses.svg'
          alt='message options'
        />
      )}
      <AnimatePresence>
        {visibleOptions && (
          <MessageOptions
            handleDelete={handleDelete}
            openEdit={openEdit}
            closeOptions={setVisibleOptions}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Message;
