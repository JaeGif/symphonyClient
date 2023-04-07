import React from 'react';
import Topic from './Topic';

function TopicsList({ setTopic }) {
  return (
    <div className='h-full overflow-scroll w-full'>
      <Topic
        setTopic={setTopic}
        title='Create New Topic'
        icon={'/assets/favicons/search.png'}
      />
      <p className='text-gray-500 m-2'>START FROM A TOPIC</p>
      <Topic
        setTopic={setTopic}
        title='Gaming'
        icon={'/assets/favicons/controller.png'}
      />
      <Topic
        setTopic={setTopic}
        title='Club'
        icon={'/assets/favicons/golf-club.png'}
      />
      <Topic
        setTopic={setTopic}
        title='Study'
        icon={'/assets/favicons/study.png'}
      />
      <Topic
        setTopic={setTopic}
        title='Friends'
        icon={'/assets/favicons/living-room.png'}
      />
      <Topic
        setTopic={setTopic}
        title='Artists'
        icon={'/assets/favicons/artist.png'}
      />
      <Topic
        setTopic={setTopic}
        title='Community'
        icon={'/assets/favicons/search.png'}
      />
    </div>
  );
}

export default TopicsList;
