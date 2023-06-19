import '../../Resources/Styles/main.css';
import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Title from './title';
import Playertest from '../Player/playertest';
import MusicTrack from '../Tracks/MusicTrack';
import logo from '../../Resources/Assets/img/logo_circle.png';
import { getGenres, saveTrack, allTracksUser, getTrack } from '../../API/laravelAPI';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Uploads() {
  const [isPlayertestOpen, setIsPlayertestOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mp3File, setMp3File] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState('');
  const [option, setOption] = useState('');
  const [error, setError] = useState('');
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);
  const [formattedTracks, setFormattedTracks] = useState([]);

  useEffect(() => {
    fetchGenres();
    fetchTracks();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await getGenres();
      setGenres(response);
    } catch (error) {
      console.log(error);
      setError('Error al obtener los géneros. Por favor, inténtalo de nuevo.');
    }
  };

  const fetchTracks = async () => {
    try {
      const tracksWithUrls = [];
      const response = await allTracksUser();

      for (const track of response.tracks) {
        const trackUrl = await getTrack(track.idTrack);
        const trackWithUrls = {
          ...track,
          trackUrl: trackUrl.url,
          imgUrl: trackUrl.img
        };
        tracksWithUrls.push(trackWithUrls);
      }
      setTracks(tracksWithUrls);
      console.log(tracksWithUrls);
      const formattedTracks = tracksWithUrls.map((track) => ({
        url: encodeURIComponent(track.trackUrl),
        title: track.trackName,
        tags: [],
      }));
      console.log(formattedTracks);

      setFormattedTracks(formattedTracks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError('Error al obtener las canciones. Por favor, inténtalo de nuevo.');
      setIsLoading(false);
    }
  };

  const handleTrackClick = () => {
    setIsPlayertestOpen(true);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setError('');
    setMp3File(null);
    setImageFile(null);
    setName('');
    setOption('');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setMp3File(selectedFile);
  };

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
  };

  const handleSubmit = async () => {
    try {
      if (!mp3File) {
        setError('Por favor, selecciona un archivo MP3.');
        return;
      }

      const formData = new FormData();
      formData.append('mp3File', mp3File);
      formData.append('trackImage', imageFile);
      formData.append('name', name);

      const selectedGenre = genres.find((genre) => genre.genreName === option);

      if (selectedGenre) {
        formData.append('option', selectedGenre.idGenre);
      }

      const response = await saveTrack(formData);
      handleCloseModal();
    } catch (error) {
      console.log(error);
      setError('Error al subir el archivo MP3. Por favor, inténtalo de nuevo.');
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
    <main id="main">
      <div className="content">
        <div className="titleContainer" style={{ display: 'flex', alignItems: 'center' }}>
          <Title titleName="Mis Subidas" />
          <IconButton onClick={handleOpenModal} style={{ marginRight: '2rem' }}>
            <AddIcon className="upload" />
          </IconButton>
        </div>
        <div className="tracksContainer">
        {tracks.length > 0 ? (
          tracks.map((trackIn) => (
            <div className="track" key={trackIn.idTrack}>
              <MusicTrack image={trackIn.imgUrl} songName={trackIn.trackName} artist={trackIn.trackArtist} />
              <div className='button-box-2'>
                <IconButton color="primary" aria-label="like" className='mobile-icon-track'>
                  <FavoriteIcon className='mobile-icon'/>
                </IconButton>
                <IconButton color="primary" aria-label="edit" className='editButton' onClick={(e) => {
                  e.stopPropagation(); // Detener la propagación del evento
                  
                }}>
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" aria-label="delete" className='deleteButton' onClick={(e) => {
                  e.stopPropagation(); // Detener la propagación del evento
                  // Agrega aquí la lógica para borrar la pista
                }}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))
        ) : (
          <p>No hay canciones disponibles.</p>
        )}
        {isPlayertestOpen && <Playertest tracks={formattedTracks} />}

        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem' }}
      >
        <div
          style={{
            width: 'auto',
            backgroundColor: '#002138',
            borderRadius: '4px',
            padding: '1rem',
            color: '#ffffff',
            border: '1px solid #f5fbff',
          }}
        >
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
          </div>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <p style={{ color: 'white', textAlign: 'center' }}>Subir MP3</p>
            </Grid>
            <Grid item>
              <label style={{ color: 'white' }}>Sube una imagen para la canción</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ color: '#ffffff', border: '1px solid #f5fbff', padding: '0.5rem', width: '100%' }}
              />
            </Grid>

            <Grid item>
              <label style={{ color: 'white' }}>Sube un MP3</label>
              <input
                type="file"
                accept="audio/mpeg"
                onChange={handleFileChange}
                style={{ color: '#ffffff', border: '1px solid #f5fbff', padding: '0.5rem', width: '100%' }}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff', border: '1px solid #f5fbff' },
                  className: 'login-input',
                  placeholder: 'Nombre de la cancion (opcional)',
                }}
              />
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel style={{ color: '#ffffff' }}>Opción</InputLabel>
                <Select
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                  label="Opción"
                  style={{ color: '#ffffff', border: '1px solid #f5fbff' }}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.idGenre} value={genre.genreName}>
                      {genre.genreName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {error && (
              <Grid item>
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                style={{ backgroundColor: '#40d8d8' }}
              >
                Subir
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </main>
  );
}

export default Uploads;
