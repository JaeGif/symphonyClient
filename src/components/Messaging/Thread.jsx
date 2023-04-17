import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Body from '../threads/Body';
import Footer from '../threads/Footer';
import Header from '../threads/Header';
// thread maps messages into a full thread with correct layout
function Thread({ socket, room }) {
  // dummy user
  const user = useContext(UserContext);

  const [message, setMessage] = useState();
  const [sentMessage, setSentMessage] = useState({});
  const [recievedMessage, setRecievedMessage] = useState({});

  const submitMessage = async () => {
    if (message !== '') {
      // send message
      const data = {
        room: room,
        user: user,
        message: message,
        timestamp: new Date(Date.now()).toString(),
      };
      console.log(data);
      await socket.emit('send_message', data);
      setSentMessage(data);
    }
  };
  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log(data);
      setRecievedMessage(data);
    });
  }, [socket]);
  return (
    <div className=''>
      <Header />
      <Body
        room={room}
        recievedMessage={recievedMessage}
        sentMessage={sentMessage}
      />
      <Footer
        room={room}
        user={user}
        socket={socket}
        setMessage={setMessage}
        submitMessage={submitMessage}
      />
    </div>
  );
}

export default Thread;
