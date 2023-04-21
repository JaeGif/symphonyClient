import React, { useState, useContext, ReactNode, CSSProperties } from 'react';
import { GiStaticWaves } from 'react-icons/gi';
import { RiCompass3Fill } from 'react-icons/ri';
import { BsPlus } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { UserContext } from '../../App';
type IconProps = {
  icon: ReactNode;
  text?: string;
  style?: CSSProperties;
};
const Icon = ({ icon, text, style }: IconProps) => {
  return (
    <div style={style} className='sidebar-icon group bg-gray-200'>
      {icon}
      {text && (
        <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
      )}
    </div>
  );
};
const AnimatedSun = animated(Icon);
const AnimatedMoon = animated(Icon);
type SidebarProps = {
  theme: 'light' | 'dark';
  setTheme: Function;
  openCreateRoom: Function;
  createRoom?: boolean;
};
function Sidebar({
  theme,
  setTheme,
  openCreateRoom,
  createRoom,
}: SidebarProps) {
  const user = useContext(UserContext);
  const handler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  return (
    <nav className='fixed top-0 left-0 h-screen w-16 flex flex-col dark:bg-gray-900 dark:border-none bg-gray-300 border-r-[1px] border-gray-300 dark:text-white shadow-lg'>
      <div>
        <Link to={user?.rooms[0] ? `/messages/${user?.rooms[0]}` : '/messages'}>
          <Icon icon={<GiStaticWaves size={32} />} text={'Direct Messages'} />
        </Link>
        <Link to={'/explore'}>
          <Icon
            icon={<RiCompass3Fill size={32} />}
            text={'Explore Public Rooms'}
          />
        </Link>
        <div
          onClick={() => {
            if (!createRoom) openCreateRoom();
          }}
        >
          <Icon icon={<BsPlus size={52} />} text={'New Chat'} />
        </div>
        <Link to={`/profile/${user!._id}`}>
          <Icon icon={<FiSettings size={32} />} text={'Settings'} />
        </Link>
      </div>
      <div>
        {theme === 'light' ? (
          <div onClick={handler} className='rounded-3xl'>
            <AnimatedMoon icon={<MdDarkMode size={32} />} text={'Theme'} />
          </div>
        ) : (
          <div onClick={handler} className='rounded-3xl'>
            <AnimatedSun
              icon={<MdOutlineLightMode size={32} />}
              text={'Theme'}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
