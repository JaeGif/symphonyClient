import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from '../messaging/Message';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { TokenContext } from '../../App';
import LoadingChat from '../utilities/LoadingChat';
import { MessageType } from '../../utilities/Interfaces';
const apiURL = import.meta.env.VITE_SOCKET_ADDRESS;
type BodyProps = {
  room: string | undefined;
  recievedMessage: MessageType;
};
function Body({ room, recievedMessage }: BodyProps) {
  const [currentThread, setCurrentThread] = useState<MessageType[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const skeletonMap = [1];

  const token = useContext(TokenContext);
  const returnLimit = 10;

  const removeMessage = (_id: string) => {
    for (let i = 0; i < currentThread.length; i++) {
      if (currentThread[i]._id === _id) {
        console.log('removing', i, currentThread[i]);
        let threadMod = [...currentThread];
        threadMod.splice(i, 1);
        setCurrentThread(threadMod);
        break;
      }
    }
  };
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
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    if (messagesQuery.data) {
      console.log(messagesQuery.data.pages.length - 1);

      if (currentThread.length !== 0) {
        console.log('copy thread');
        setCurrentThread([
          ...currentThread,

          ...messagesQuery.data.pages[messagesQuery.data.pages.length - 1]
            .messages,
        ]);
      } else if (currentThread.length === 0) {
        setCurrentThread(messagesQuery.data.pages[0].messages);
      }
    }
  }, [messagesQuery.data?.pages.length]);

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
    console.log(recievedMessage);
    if (recievedMessage) setCurrentThread([recievedMessage, ...currentThread]);
    console.log(currentThread);
  }, [recievedMessage]);
  return (
    <div
      ref={ref}
      className={
        'flex flex-col-reverse overflow-scroll h-[calc(100vh-7rem)] flex-1'
      }
    >
      {currentThread.length !== 0 &&
        currentThread.map((messageObj) => (
          <Message message={messageObj} removeMessage={removeMessage} />
        ))}
      {messagesQuery.isFetching && skeletonMap.map((el) => <LoadingChat />)}
    </div>
  );
}

export default Body;
