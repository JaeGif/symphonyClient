import React from 'react';

function EmojiIcon({ icon, mouseOver, mouseOut }) {
  return (
    <div
      onMouseOut={() => {
        mouseOut();
      }}
      onMouseOver={() => mouseOver()}
      className='flex items-center m-3 mt-1'
    >
      {icon}
    </div>
  );
}

export default EmojiIcon;
