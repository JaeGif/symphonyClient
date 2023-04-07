import React, { useState } from 'react';
import { GiStaticWaves } from 'react-icons/gi';
import { RiCompass3Fill } from 'react-icons/ri';
import { BsPlus } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';

const Icon = ({ icon, text, style = {} }) => {
  return (
    <div style={style} className='sidebar-icon group'>
      {icon}
      {text && (
        <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
      )}
    </div>
  );
};
const AnimatedSun = animated(Icon);
const AnimatedMoon = animated(Icon);

function Sidebar({ theme, setTheme, toggleCreateRoom }) {
  const handler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  return (
    <nav className='fixed top-0 left-0 h-screen w-16 flex flex-col dark:bg-gray-900 dark:text-white shadow-lg'>
      <div>
        <Link to={'/messages'}>
          <Icon icon={<GiStaticWaves size={32} />} text={'Direct Messages'} />
        </Link>
        <Link to={'/'}>
          <Icon
            icon={<RiCompass3Fill size={32} />}
            text={'Explore Public Rooms'}
          />
        </Link>
        <div onClick={() => toggleCreateRoom()}>
          <Icon icon={<BsPlus size={52} />} text={'New Chat'} />
        </div>
        <Link>
          <Icon icon={<FiSettings size={32} />} text={'Settings'} />
        </Link>
      </div>
      <div>
        {theme === 'light' ? (
          <div onClick={handler} className='rounded-3xl'>
            <AnimatedMoon icon={<MdDarkMode size={32} />} />
          </div>
        ) : (
          <div onClick={handler} className='rounded-3xl'>
            <AnimatedSun icon={<MdOutlineLightMode size={32} />} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
