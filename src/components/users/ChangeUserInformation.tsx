import React, { useState, useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';

function ChangeUserInformation() {
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

  const [website, setWebsite] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>();
  const [image, setImage] = useState<string | ArrayBuffer | null>('');
  const [disabled, setDisabled] = useState(false);
  const [wordCount, setWordCount] = useState(`0/${maxCount}`);

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
    const length = bio.length;
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
          className='bg-gray-100 p-3 rounded-md'
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
          className='p-3 rounded-md w-full border-[1px] bg-gray-100 outline-none resize-y'
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
          className='bg-gray-100 p-3 rounded-md'
          onChange={(e) => setWebsite(e.target.value)}
          type='text'
        />
      </div>
    </div>
  );
}

export default ChangeUserInformation;
