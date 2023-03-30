import React, { useState, useEffect } from 'react';
import { BsEmojiSmile, BsEmojiWink } from 'react-icons/bs';
import StandardIcon from '../utilities/StandardIcon';
import TextareaAutosize from 'react-textarea-autosize';

function Footer({ threadName = 'the group', setMessage, submitMessage }) {
  const handleEnterPress = (e) => {
    // enter key has code 13
    if (e.keyCode === 13 && !e.shiftKey) {
      // submit the data
      e.preventDefault();
      submitMessage();
      e.target.value = '';
    }
  };
  return (
    <div className=' dark:bg-gray-700 w-[calc(80%-3.2rem)] absolute bottom-0 '>
      <TextareaAutosize
        rows={'1'}
        style={{ height: 'auto' }}
        onInput={(e) => {
          e.target.dataset.replicatedValue = e.value;
        }}
        className='p-2.5 dark:bg-gray-600 m-3 mt-1 w-100 focus:outline-none resize-none rounded-lg placeholder-gray-500 shadow-md drop-shadow-sm'
        onKeyDown={(e) => handleEnterPress(e)}
        onChange={(e) => setMessage(e.target.value)}
        type='text'
        placeholder={`Message ${threadName}`}
      ></TextareaAutosize>
      <StandardIcon icon={BsEmojiSmile} />
    </div>
  );
}

export default Footer;
