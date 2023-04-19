import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from '../messaging/Message';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TokenContext } from '../../App';
import LoadingChat from '../utilities/LoadingChat';
import { MessageType } from '../../utilities/Interfaces';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
type BodyProps = {
  room: string | undefined;
  recievedMessage: MessageType | null;
  sentMessage: MessageType | null;
};
function Body({ room, recievedMessage = null, sentMessage = null }: BodyProps) {
  const [currentThread, setCurrentThread] = useState<MessageType[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const skeletonMap = [1];

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
    const messageContainer = ref.current as HTMLDivElement;
    if (!messageContainer) return;
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
    if (!recievedMessage) return;
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
    if (!sentMessage) return;
    const keys = Object.keys(sentMessage);
    // populate thread when sending a message
    if (currentThread.length >= 1 && keys.length !== 0) {
      setCurrentThread(([...currentThread]) => [sentMessage, ...currentThread]);
    } else if (currentThread.length === 0 && keys.length !== 0) {
      setCurrentThread([sentMessage]);
    }
  }, [sentMessage]);
  return (
    <div
      ref={ref}
      className={
        'flex flex-col-reverse overflow-scroll h-[calc(100vh-6rem)] flex-1'
      }
    >
      {currentThread.length !== 0 &&
        currentThread.map((messageObj) => <Message message={messageObj} />)}
      {messagesQuery.isFetching && skeletonMap.map((el) => <LoadingChat />)}
    </div>
  );
}

export default Body;
