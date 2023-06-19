import React from 'react';
import Player from '@madzadev/audio-player';

/*
const tracks = [
    {
      url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
      title: "Madza - Chords of Life",
      tags: ["house"],
    },
    {
      url: require('./1.mp3'),
      title: "esta cancion es mia porcierto",
      tags: ["dnb"],
    },
    {
      url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
      title: "Madza - Persistence",
      tags: ["dubstep"],
    },
  ]; */
  
  const colors = `html {
    --tagsBackground: #40d8d8;
    --tagsText: #ffffff;
    --tagsBackgroundHoverActive: #2cc0a0;
    --tagsTextHoverActive: #ffffff;
    --searchBackground: #18191f;
    --searchText: #ffffff;
    --searchPlaceHolder: #575a77;
    --playerBackground: #18191f;
    --titleColor: #ffffff; 
    --timeColor: #ffffff;
    --progressSlider: #40d8d8;
    --progressUsed: #ffffff;
    --progressLeft: #151616;
    --volumeSlider: #40d8d8;
    --volumeUsed: #ffffff;
    --volumeLeft:  #151616;
    --playlistBackground: #18191f;
    --playlistText: #575a77;
    --playlistBackgroundHoverActive:  #18191f;
    --playlistTextHoverActive: #ffffff;
}`;

function playertest({ tracks }) {
    return (
        <Player trackList={tracks}
            includeTags={false}
            includeSearch={false}
            autoPlayNextTrack={true}
            customColorScheme={colors} 
            />
    );
  }
  export default playertest