import React from 'react';
import gfm from 'remark-gfm'; // GH flavored markdown plugin
import torchlight from 'remark-torchlight'; // syntax highlighting plugin for code
import ReactMarkdown from 'react-markdown';

function Message({ message }) {
  return (
    <div>
      message
      <ReactMarkdown remarkPlugins={[gfm, torchlight]}>{message}</ReactMarkdown>
    </div>
  );
}

export default Message;
