import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import TextareaAutosize from 'react-textarea-autosize';
type FooterProps = {
  setMessage: Function;
  submitMessage: Function;
};
function Footer({ setMessage, submitMessage }: FooterProps) {
  const context: { toggleChats: Function; isShowingCurrent: boolean } =
    useOutletContext();
  const [openW, setOpenW] = useState(3);
  useEffect(() => {
    console.log(context, openW);
    if (context.isShowingCurrent) setOpenW(1);
    else if (!context.isShowingCurrent) setOpenW(4);
  }, [context.isShowingCurrent]);
  const handleEnterPress = (e: any) => {
    // enter key has code 13
    if (e.keyCode === 13 && !e.shiftKey) {
      // submit the data
      e.preventDefault();
      submitMessage();
      e.target.value = '';
    }
  };

  return (
    <div
      className={`dark:bg-gray-700 w-[calc(100%-${openW}rem)] sm:w-[calc(80%-2rem)] absolute bottom-16 sm:bottom-0 flex justify-start content-center`}
    >
      <TextareaAutosize
        rows={1}
        onInput={(e: any) => {
          e.target.dataset.replicatedValue = e.value;
        }}
        className={
          context.isShowingCurrent
            ? 'p-2.5 dark:bg-gray-600 sm:m-3 mt-1 mr-0 w-screen focus:outline-none resize-none rounded-lg placeholder-gray-500 shadow-md drop-shadow-sm'
            : 'p-2.5 dark:bg-gray-600 m-3 mt-1 mr-0 w-screen focus:outline-none resize-none rounded-lg placeholder-gray-500 shadow-md drop-shadow-sm'
        }
        onKeyDown={(e) => handleEnterPress(e)}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={`Message the group`}
      ></TextareaAutosize>
    </div>
  );
}
export default Footer;
