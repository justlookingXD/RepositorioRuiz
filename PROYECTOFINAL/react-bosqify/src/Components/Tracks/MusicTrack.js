import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton, Modal, TextField, Button } from '@mui/material';
import placeholder from '../../Resources/Assets/img/placeholder.png';

function MusicTrack({ image, songName, artist }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTrackName, setEditedTrackName] = useState(songName);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  }

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  }

  const handleSave = () => {
    // Lógica para guardar los cambios del nombre de la canción
    handleEditModalClose();
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className='cardContainer'>
        <Card className='card'>
          <CardMedia component="img" src={image || placeholder} alt={songName} className='cardMedia' />
  
          <CardContent className='cardContent'>
            <div className='trackInfo'>
              <Typography variant="h6" component="div" className='name-track'>
                {songName}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {artist}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <Box className="boxStyles">
        <Card className='box'>
          <CardContent className="cardStyles">
            <CardMedia component="img" src={image || placeholder} alt="Song" className="mediaStyles" />
            <div className="contentStyles">
              <Typography variant="h6" component="div" className="mobile-name-track">
                {songName}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <div className='musicTrack'>
      <img src={image} alt="Track" className="trackImage" />
      <div className="trackInfo">
        <Typography variant="h6" component="div" className="songName">
          {songName}
        </Typography>
        <Typography variant="subtitle1" component="div" className="artist">
          {artist}
        </Typography>
      </div>

      <Modal open={isEditModalOpen} onClose={handleEditModalClose}>
        <div className="editModal">
          <h2>Editar canción</h2>
          <TextField
            label="Nombre de la canción"
            value={editedTrackName}
            onChange={(e) => setEditedTrackName(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Guardar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default MusicTrack;
