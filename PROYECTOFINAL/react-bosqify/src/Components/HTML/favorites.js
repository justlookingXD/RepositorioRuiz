// main.js
import '../../Resources/Styles/main.css';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getUser } from '../../API/laravelAPI';
import { CircularProgress } from '@mui/material';
import Title from './title';
import Playertest from '../Player/playertest';
import MusicTrack from '../Tracks/MusicTrack';


function Favorites() {

  const [isPlayertestOpen, setIsPlayertestOpen] = useState(false);

  const handleTrackClick = () => {
    setIsPlayertestOpen(true);
  };
  return (
    <main id="main">
      <div className='content'>
        <div className='titleContainer'>
          <Title titleName="Favoritos" />
        </div>
        <div className='tracksContainer'>
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />}
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />} 
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />} 
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />} 
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />} 
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />} 
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />} 
            <div className='track' onClick={handleTrackClick}>
              <MusicTrack />
            </div>
            {isPlayertestOpen && <Playertest />}   
        </div>
      </div>
    </main>
  );
}

export default Favorites;
