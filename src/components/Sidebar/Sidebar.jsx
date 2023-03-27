import React from 'react';
import { GiStaticWaves } from 'react-icons/gi';
import { RiCompass3Fill } from 'react-icons/ri';
import { BsPlus } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Sidebar({ theme, setTheme }) {
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
        <Link to='/'>
          <Icon icon={<BsPlus size={52} />} text={'New Chat'} />
        </Link>
        <Link>
          <Icon icon={<FiSettings size={32} />} text={'Settings'} />
        </Link>
      </div>
      <div
        onClick={() =>
          theme === 'light' ? setTheme('dark') : setTheme('light')
        }
      >
        {theme === 'light' ? (
          <Icon icon={<MdDarkMode size={32} />} />
        ) : (
          <Icon icon={<MdOutlineLightMode size={32} />} />
        )}
      </div>
    </nav>
  );
}

const Icon = ({ icon, text }) => {
  return (
    <div className='sidebar-icon group'>
      {icon}
      {text && (
        <span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
      )}
    </div>
  );
};

export default Sidebar;
