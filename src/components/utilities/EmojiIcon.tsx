import React from 'react';
type EmojiIconProps = {
  icon: React.ReactNode;
  mouseOver: Function;
  mouseOut: Function;
};
function EmojiIcon({ icon, mouseOver, mouseOut }: EmojiIconProps) {
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
