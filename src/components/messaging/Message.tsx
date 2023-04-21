import React, { useContext, useEffect, useState } from 'react';
import gfm from 'remark-gfm'; // GH flavored markdown plugin
import remarkGemoji from 'remark-gemoji';
import ReactMarkdown from 'react-markdown';
import UserHead from '../users/UserHead';
import Timestamp from '../utilities/Timestamp';
import { MessageType } from '../../utilities/Interfaces';
import { TokenContext, UserContext } from '../../App';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import MessageOptions from '../modals/messageOptions/MessageOptions';
import { AnimatePresence } from 'framer-motion';
import TextareaAutosize from 'react-textarea-autosize';

const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;

type MessageProps = {
  message: MessageType;
  removeMessage: Function;
};

function Message({ message, removeMessage }: MessageProps) {
  const token = useContext(TokenContext);
  const user = useContext(UserContext);
  const [visibleOptions, setVisibleOptions] = useState<boolean>(false);
  const [edits, setEdits] = useState<string | undefined>(message.message);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const deleteMessage = async () => {
    const res = await fetch(`${apiURL}/api/messages/${message._id}`, {
      mode: 'cors',
      method: 'DELETE',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
  };
  const putMessage = async () => {
    const editData = {
      message: edits,
    };
    const res = await fetch(`${apiURL}/api/messages/${message._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(editData),

      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data.message;
  };
  const deleteMutation = useMutation({
    mutationKey: ['deleteMessage'],
    mutationFn: deleteMessage,
    onSuccess: () => {
      removeMessage(message._id);
    },
  });
  const editMutatation = useMutation({
    mutationKey: ['editMessage'],
    mutationFn: putMessage,
    onSuccess: (data) => {
      setIsEditing(false);
    },
  });
  const handleDelete = () => {
    deleteMutation.mutate();
  };
  const handleEnterPress = (e: any) => {
    // enter key has code 13
    if (e.keyCode === 13 && !e.shiftKey) {
      // submit the data
      e.preventDefault();
      // Edit mutation
      editMutatation.mutate();

      e.target.value = '';
    }
  };
  const openEdit = () => {
    setIsEditing(true);
  };
  return (
    <div className={`flex hover:dark:bg-gray-800 p-3 justify-between relative`}>
      <div className='flex gap-2 items-center'>
        <UserHead hover={false} user={message.user!} size={'md'} />
        <div>
          <Timestamp
            timestamp={message.timestamp}
            username={message.user!.username}
          />
          {isEditing ? (
            <TextareaAutosize
              rows={1}
              onInput={(e: any) => {
                e.target.dataset.replicatedValue = e.value;
              }}
              className='p-2.5 dark:bg-gray-600 m-3 mt-1 mr-0 w-screen focus:outline-none resize-none rounded-lg placeholder-gray-500 shadow-md drop-shadow-sm'
              onKeyDown={(e) => handleEnterPress(e)}
              onChange={(e) => setEdits(e.target.value)}
              defaultValue={edits}
            ></TextareaAutosize>
          ) : (
            <ReactMarkdown remarkPlugins={[gfm, remarkGemoji]}>
              {edits !== message.message ? `${edits}` : `${message.message!}`}
            </ReactMarkdown>
          )}
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
