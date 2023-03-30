import React, { useEffect, useState } from 'react';
import Message from '../messaging/Message';

function Body({ recievedMessage = null, sentMessage = null }) {
  const [currentThread, setCurrentThread] = useState([]);
  const fetchRecentMessages = async () => {
    // get the most recent 10 messages in the room and populate currentThread with them.
  };
  useEffect(() => {
    const keys = Object.keys(recievedMessage);

    if (currentThread.length >= 1 && keys.length !== 0) {
      setCurrentThread(([...currentThread]) => [
        ...currentThread,
        recievedMessage,
      ]);
    } else if (currentThread.length === 0 && keys.length !== 0) {
      setCurrentThread([recievedMessage]);
    }
  }, [recievedMessage]);
  useEffect(() => {
    const keys = Object.keys(sentMessage);
    console.log(keys);
    // populate thread when sending a message
    if (currentThread.length >= 1 && keys.length !== 0) {
      setCurrentThread(([...currentThread]) => [...currentThread, sentMessage]);
    } else if (currentThread.length === 0 && keys.length !== 0) {
      console.log(sentMessage);
      setCurrentThread([sentMessage]);
    }
  }, [sentMessage]);
  useEffect(() => {
    console.log('thread state:', currentThread);
  }, [currentThread]);
  return (
    <div className=''>
      {currentThread.length !== 0 &&
        currentThread.map((messageObj) => <Message message={messageObj} />)}
    </div>
  );
}

export default Body;
