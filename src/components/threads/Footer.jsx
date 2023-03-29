import React, { useState, useEffect } from 'react';

function Footer({ threadName = 'the group', setMessage, submitMessage }) {
  const handleEnterPress = (e) => {
    // enter key has code 13
    if (e.keyCode === 13 && !e.shiftKey) {
      // submit the data
      e.preventDefault();
      submitMessage();
    }
  };
  return (
    <div>
      <textarea
        onKeyDown={(e) => handleEnterPress(e)}
        onChange={(e) => setMessage(e.target.value)}
        type='text'
        placeholder={`Message ${threadName}`}
      ></textarea>
      <button>Send</button>
    </div>
  );
}

export default Footer;
