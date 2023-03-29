import React, { useEffect, useState } from 'react';
import Body from '../threads/Body';
import Footer from '../threads/Footer';
import Header from '../threads/Header';
// thread maps messages into a full thread with correct layout
function Thread({ socket, room }) {
  // dummy user
  const user = {
    firstName: 'Jae',
    lastName: "It's",
    username: "It's Jae",
    rooms: [room],
  };
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
        timestamp:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
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
    <div>
      <Header />
      <Body recievedMessage={recievedMessage} sentMessage={sentMessage} />
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
