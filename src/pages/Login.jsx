import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/effects/Background';
import { motion, useTransform, useMotionValue } from 'framer-motion';

function Login() {
  const [animationDone, setAnimationDone] = useState(false);
  const x = useMotionValue(0);
  useEffect(() => {
    setTimeout(() => setAnimationDone(true), 2500);
  }, []);

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
                className='w-full bg-gray-900 h-9 text-gray-300 rounded-sm border-gray-950 border-[1px] text-xl'
              />
            </div>
            <div>
              <label className='font-bold text-xs text-gray-300'>
                PASSWORD
              </label>
              <input
                type='password'
                className='w-full bg-gray-900 h-9 text-gray-300 rounded-sm border-gray-950 border-[1px] text-xl'
              />
            </div>
            <div>
              <button className='h-8 bg-blue-800 hover:bg-blue-700 w-full rounded-r-sm text-md'>
                Login
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
