import '../../Resources/Styles/rightaside.css';
import React, { useEffect, useState } from 'react';
import { getGenres } from '../../API/laravelAPI';
import Asideoption from './asideoption';
import { CircularProgress } from '@mui/material';


function Rightaside() {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await getGenres();
      console.log(response);
      setGenres(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // Manejo del error
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div id="aside-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div id="aside-container">
      {genres.map((genre) => (
        <Asideoption key={genre.idGenre} genreName={genre.genreName} genreImg={genre.genreImg} />
      ))}
    </div>
  );
}

export default Rightaside;
