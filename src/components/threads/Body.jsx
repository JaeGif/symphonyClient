import React, { useEffect, useState } from 'react';
import Message from '../messaging/Message';
import { useInfiniteQuery } from '@tanstack/react-query';

function Body({ recievedMessage = null, sentMessage = null }) {
  const [currentThread, setCurrentThread] = useState([]);
  const fetchRecentMessages = async () => {
    // get the most recent 10 messages in the room and populate currentThread with them.
  };
  /*   const returnLimit = 5;

  const postsQuery = useInfiniteQuery(
    ['posts', { u: loggedInUser._id }],
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${apiURL}/api/posts?u=${loggedInUser._id}&cursor=${pageParam}&returnLimit=${returnLimit}`,
        {
          mode: 'cors',
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
    const onScroll = function () {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        let scrollDistance = window.innerHeight / 10;
        window.scrollBy(0, -scrollDistance);

        if (!postsQuery.isFetchingNextPage) {
          postsQuery.fetchNextPage();
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [postsQuery.isFetching]); */
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
    console.log(keys);
    // populate thread when sending a message
    if (currentThread.length >= 1 && keys.length !== 0) {
      setCurrentThread(([...currentThread]) => [sentMessage, ...currentThread]);
    } else if (currentThread.length === 0 && keys.length !== 0) {
      console.log(sentMessage);
      setCurrentThread([sentMessage]);
    }
  }, [sentMessage]);

  return (
    <div className='flex flex-col-reverse overflow-scroll h-[calc(100vh-6rem)] flex-1]'>
      {currentThread.length !== 0 &&
        currentThread.map((messageObj) => <Message message={messageObj} />)}
    </div>
  );
}

export default Body;
