import React from 'react';
import style from './effects.module.css';

function Background() {
  return (
    <>
      <div className='relative w-screen h-screen overflow-hidden debug'>
        <img
          className={`min-w-[2160px] min-h-[3840px] ${style.animation} ${style.colorimg} absolute debug`}
          src='/assets/graffiti-grey.png'
          alt='background grey'
        ></img>
        <img
          className='min-w-[2160px] min-h-[3840px] block debug'
          src='/assets/graffiti-original.jpg'
          alt='background color'
        ></img>
      </div>
    </>
  );
}

export default Background;
