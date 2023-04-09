import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from '../messaging/Message';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TokenContext } from '../../App';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;

function Body({ room, recievedMessage = null, sentMessage = null }) {
  const [currentThread, setCurrentThread] = useState([]);
  const ref = useRef(null);

  const token = useContext(TokenContext);
  const returnLimit = 10;

  const messagesQuery = useInfiniteQuery(
    ['messages', { room: room }],
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${apiURL}/api/messages?room=${room}&cursor=${pageParam}&returnLimit=${returnLimit}`,
        {
          mode: 'cors',
          method: 'GET',
          headers: {
            Authorization: 'Bearer' + ' ' + token,
          },
        }
      );
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
      getPreviousPageParam: (firstPage, pages) =>
        firstPage.previousCursor ?? undefined,
    }
  );
  useEffect(() => {
    if (messagesQuery.data) {
      if (currentThread.length !== 0) {
        setCurrentThread([
          ...currentThread,
          ...messagesQuery.data.pages[messagesQuery.data.pages.length - 1]
            .messages,
        ]);
      } else if (currentThread.length === 0) {
        setCurrentThread(messagesQuery.data.pages[0].messages);
      }
    }
  }, [messagesQuery.isFetching]);

  useEffect(() => {
    const messageContainer = ref.current;
    const onScroll = function () {
      if (messageContainer.scrollTop === 0) {
        if (!messagesQuery.isFetchingNextPage) {
          messagesQuery.fetchNextPage();
        }
      }
    };
    messageContainer.addEventListener('scroll', onScroll);
    return () => messageContainer.removeEventListener('scroll', onScroll);
  }, [messagesQuery.isFetching]);

  useEffect(() => {
    const keys = Object.keys(recievedMessage);

    if (currentThread.length >= 1 && keys.length !== 0) {
      setCurrentThread(([...currentThread]) => [
        recievedMessage,
        ...currentThread,
      ]);
    } else if (currentThread.length === 0 && keys.length !== 0) {
      setCurrentThread([recievedMessage]);
    }
  }, [recievedMessage]);
  useEffect(() => {
    const keys = Object.keys(sentMessage);
    // populate thread when sending a message
    if (currentThread.length >= 1 && keys.length !== 0) {
      setCurrentThread(([...currentThread]) => [sentMessage, ...currentThread]);
    } else if (currentThread.length === 0 && keys.length !== 0) {
      console.log(sentMessage);
      setCurrentThread([sentMessage]);
    }
  }, [sentMessage]);

  return (
    <div
      ref={ref}
      className='flex flex-col-reverse overflow-scroll h-[calc(100vh-6rem)] flex-1]'
    >
      {currentThread.length !== 0 &&
        currentThread.map((messageObj) => <Message message={messageObj} />)}
      {messagesQuery.isFetching && <p>Loading</p>}
    </div>
  );
}

export default Body;
