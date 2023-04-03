import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/effects/Background';
import { motion } from 'framer-motion';
import { Bars } from 'react-loading-icons';

function Login({ loginUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimationDone(true), 2500);
    return () => {
      setIsLoading(false);
    };
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Background />
      <motion.div
        animate={
          ({ opacity: animationDone ? 1 : 0 }, { scale: animationDone ? 1 : 0 })
        }
        style={{ originX: 1, x: 0 }}
        className={
          animationDone
            ? 'absolute w-[400px] top-[10vh] left-[calc(50vw-200px)] flex items-center flex-col'
            : 'hidden'
        }
      >
        <div>
          <p className='text-9xl font-dirtyClassic'>Symphony</p>
        </div>
        <div className='w-full bg-gray-800 rounded-md shadow-lg text-white flex flex-col justify-center items-center p-8'>
          <p className='text-3xl'>Welcome Back!</p>
          <p className='text-gray-500'>We're so excited to see you today!</p>
          <div className='flex flex-col gap-3 mt-2'>
            <div>
              <label className='font-bold text-xs text-gray-300'>
                USERNAME
              </label>
              <input
                type='text'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className='w-full bg-gray-900 h-9 text-gray-300 rounded-sm border-gray-950 border-[1px] text-xl pl-1'
              />
            </div>
            <div>
              <label className='font-bold text-xs text-gray-300'>
                PASSWORD
              </label>
              <input
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className='w-full bg-gray-900 h-9 text-gray-300 rounded-sm border-gray-950 border-[1px] text-xl'
              />
            </div>
            <div>
              <button
                onClick={() => {
                  setIsLoading(true);
                  loginUser(username, password);
                }}
                className='h-8 bg-blue-800 hover:bg-blue-700 w-full rounded-sm text-md flex justify-center items-center'
              >
                {isLoading ? <Bars className='h-5' /> : 'Login'}
              </button>
              <Link className='text-blue-500 text-sm' to='/register'>
                Register an Account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
