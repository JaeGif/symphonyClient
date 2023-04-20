import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, spring, easeOut } from 'framer-motion';
import uniqid from 'uniqid';

type MessageOptionsProps = {
  handleDelete: Function;
  openEdit: Function;
  closeOptions: Function;
};
function MessageOptions({
  handleDelete,
  openEdit,
  closeOptions,
}: MessageOptionsProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeOptions(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      key={uniqid()}
      ref={ref}
      className='h-full flex bg-gray-950 absolute right-[calc(48px+.75rem)] top-0 rounded-lg overflow-hidden'
    >
      <button
        className='text-blue-50 hover:bg-gray-900 p-5'
        onClick={() => openEdit()}
      >
        Edit
      </button>
      <button
        className='text-red-500 hover:bg-gray-900 p-5'
        onCanPlayThrough={() => handleDelete()}
      >
        Delete
      </button>
    </motion.div>
  );
}

export default MessageOptions;
