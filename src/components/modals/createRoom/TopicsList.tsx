import React from 'react';
import Topic from './Topic';
type TopicsListProps = {
  handleTopicSelection: Function;
};
function TopicsList({ handleTopicSelection }: TopicsListProps) {
  return (
    <div className='h-full overflow-scroll w-full'>
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Create New Topic'
        icon={'/assets/favicons/search.png'}
      />
      <p className='text-gray-500 m-2'>START FROM A TOPIC</p>
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Gaming'
        icon={'/assets/favicons/controller.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Club'
        icon={'/assets/favicons/golf-club.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Study'
        icon={'/assets/favicons/study.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Friends'
        icon={'/assets/favicons/living-room.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Artists'
        icon={'/assets/favicons/artist.png'}
      />
      <Topic
        handleTopicSelection={handleTopicSelection}
        title='Community'
        icon={'/assets/favicons/search.png'}
      />
    </div>
  );
}

export default TopicsList;
