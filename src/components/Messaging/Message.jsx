import React from 'react';
import gfm from 'remark-gfm'; // GH flavored markdown plugin
import a11yEmoji from '@fec/remark-a11y-emoji';
import remarkGemoji from 'remark-gemoji';
import ReactMarkdown from 'react-markdown';
import UserHead from '../users/UserHead';
import Timestamp from '../utilities/Timestamp';

function Message({ message }) {
  return (
    <div className={`flex gap-2 hover:dark:bg-gray-800 p-3`}>
      <UserHead user={message.user} />
      <div>
        <Timestamp
          timestamp={message.timestamp}
          username={message.user.username}
        />
        <ReactMarkdown remarkPlugins={[gfm, a11yEmoji, remarkGemoji]}>
          {message.message}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;
