import React, { useState, useEffect, useContext } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { TokenContext, UserContext } from '../../App';
import Bars from 'react-loading-icons/dist/esm/components/bars';

const apiURL: string = import.meta.env.VITE_SOCKET_ADDRESS;
type ChangeUserInformationProps = {
  refreshUserData: Function;
};
function ChangeUserInformation({
  refreshUserData,
}: ChangeUserInformationProps) {
  const fileTypes = [
    'jpg',
    'png',
    'jpeg',
    'gif',
    'apng',
    'svg',
    'bmp',
    'bmp ico',
    'png ico',
    'avif',
    'webp',
  ];
  const maxCount = 150;
  const user = useContext(UserContext);
  const token = useContext(TokenContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [website, setWebsite] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [wordCount, setWordCount] = useState(`0/${maxCount}`);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const submitChanges = async () => {
    setIsLoading(true);

    const data = {
      bio: bio,
      email: email,
      website: website,
      order: 'updateUser',
    };
    const res = await fetch(`${apiURL}/api/users/${user?._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    setStatusCode(res.status);
  };
  useEffect(() => {
    if (statusCode === 200) {
      () => refreshUserData();
    }
    setIsLoading(false);
  }, [statusCode]);

  const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target;
    email.setCustomValidity('');
    if (email.checkValidity()) {
      console.log('checking email');
      const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (pattern.test(email.value)) {
        email.setCustomValidity('');
        setEmail(e.target.value);
      } else {
        email.setCustomValidity('Please enter a valid email address.');
        email.reportValidity();
      }
    }
  };
  const handleFile = (file: File) => {
    setImageFile(file);
  };
  const countWords = () => {
    let modBio = bio;
    if (!modBio) modBio = '';
    const length = modBio.length;
    setWordCount(`${length}/${maxCount}`);
    if (length >= maxCount) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  useEffect(() => {
    if (!imageFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target!.result);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  return (
    <div className='dark:bg-gray-900 bg-white p-3 flex flex-col gap-2'>
      <div>
        <label className='text-blue-400 text-xl font-bold'>Change Avatar</label>
        {imageFile ? (
          <div className='flex justify-evenly items-center gap-1'>
            <div className='h-24 w-24 flex justify-center items-center rounded-[50%] overflow-hidden'>
              <img className='h-24' src={`${image}`} />
            </div>
            <img
              onClick={() => setImageFile(null)}
              className='h-12 w-12 cursor-pointer'
              src='/assets/favicons/add-photo.svg'
            />
          </div>
        ) : (
          <FileUploader
            handleChange={handleFile}
            name='file'
            types={fileTypes}
            onTypeError={() => alert('Invalid file type.')}
          />
        )}
      </div>
      <div className='flex flex-col'>
        <label className='text-blue-400 text-xl font-bold'>Email</label>
        <input
          className='bg-gray-100 dark:bg-gray-950 p-3 rounded-md'
          onChange={(e) => validateEmail(e)}
          type='email'
        />
      </div>
      <div className='relative'>
        <label className='text-blue-400 text-xl font-bold'>Bio</label>
        <textarea
          maxLength={150}
          onKeyUp={countWords}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          className='p-3 rounded-md w-full bg-gray-100 dark:bg-gray-950 outline-none resize-y'
          name='description'
          id='description'
        ></textarea>
        <div className='absolute bottom-1 right-5'>
          <p className={disabled ? 'text-red-500 text-xs' : 'text-xs'}>
            {wordCount}
          </p>
        </div>
      </div>
      <div className='flex flex-col'>
        <label className='text-blue-400 text-xl font-bold'>Personal Site</label>
        <input
          className='bg-gray-100 dark:bg-gray-950 p-3 rounded-md'
          onChange={(e) => setWebsite(e.target.value)}
          type='text'
        />
      </div>
      <button
        onClick={submitChanges}
        className='dark:bg-blue-600 bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-md dark:hover:bg-blue-500 flex justify-center items-center'
      >
        {isLoading ? <Bars className='h-6' /> : 'Confirm Changes'}
      </button>
    </div>
  );
}

export default ChangeUserInformation;
