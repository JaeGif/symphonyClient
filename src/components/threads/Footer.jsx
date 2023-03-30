import React, { useState, useEffect } from 'react';
import { BsEmojiSmile, BsEmojiWink } from 'react-icons/bs';
import EmojiIcon from '../utilities/EmojiIcon';
import TextareaAutosize from 'react-textarea-autosize';

function Footer({ threadName = 'the group', setMessage, submitMessage }) {
  const [wink, setWink] = useState(false);
  const handleEnterPress = (e) => {
    // enter key has code 13
    if (e.keyCode === 13 && !e.shiftKey) {
      // submit the data
      e.preventDefault();
      submitMessage();
      e.target.value = '';
    }
  };
  const mouseOver = () => {
    setWink(true);
  };
  const mouseOut = () => {
    setWink(false);
  };
  return (
    <div className='dark:bg-gray-700 w-[calc(80%-3.2rem)] absolute bottom-0 flex justify-start content-center'>
      <TextareaAutosize
        rows={'1'}
        style={{ height: 'auto' }}
        onInput={(e) => {
          e.target.dataset.replicatedValue = e.value;
        }}
        className='p-2.5 dark:bg-gray-600 m-3 mt-1 mr-0 w-screen focus:outline-none resize-none rounded-lg placeholder-gray-500 shadow-md drop-shadow-sm'
        onKeyDown={(e) => handleEnterPress(e)}
        onChange={(e) => setMessage(e.target.value)}
        type='text'
        placeholder={`Message ${threadName}`}
      ></TextareaAutosize>

      <EmojiIcon
        mouseOut={mouseOut}
        mouseOver={mouseOver}
        icon={
          wink ? (
            <BsEmojiWink className='text-pink-500 cursor-pointer' size={32} />
          ) : (
            <BsEmojiSmile className='cursor-pointer' size={32} />
          )
        }
      />
    </div>
  );
}

export default Footer;
