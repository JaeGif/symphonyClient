import React from 'react';
import style from './effects.module.css';

function Background() {
  return (
    <>
      <div className='relative w-screen h-screen overflow-hidden debug'>
        <img
          className={` max-w-screen max-h-[3840px] min-h-full ${style.animation} ${style.colorimg} absolute debug`}
          src='/assets/graffiti-grey.png'
          alt='background grey'
        ></img>
        <img
          className='max-w-screen max-h-[3840px] min-h-full block debug'
          src='/assets/graffiti-original.jpg'
          alt='background color'
        ></img>
      </div>
    </>
  );
}

export default Background;
