import React from 'react';
import gfm from 'remark-gfm'; // GH flavored markdown plugin
import a11yEmoji from '@fec/remark-a11y-emoji';
import ReactMarkdown from 'react-markdown';
import remarkGemoji from 'remark-gemoji';
function Message({ message }) {
  console.log(message);
  return (
    <div>
      <ReactMarkdown remarkPlugins={[gfm, a11yEmoji, remarkGemoji]}>
        {message.message}
      </ReactMarkdown>
    </div>
  );
}

export default Message;
