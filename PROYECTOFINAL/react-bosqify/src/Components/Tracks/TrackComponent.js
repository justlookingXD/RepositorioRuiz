import React from 'react';
import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';
import { useFetchTracks } from '../../api/api';

function TrackComponent() {
  const { isLoading, error, data } = useQuery('tracks', useFetchTracks);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='trackContainer'>
      <div className='trackBox'>
        
      </div>
    </div>
  );
}

export default TrackComponent;