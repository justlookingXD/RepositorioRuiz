import React, { useEffect, useState } from 'react';

// Importar todas las imágenes del directorio
function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Obtener el contexto de requerimiento para las imágenes
const images = importAll(require.context('../../Resources/Assets/img/genre', false, /\.png/));

function Asideoption({ idGenre, genreName, genreImg }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = images[genreImg];
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [genreImg]);

  return (
    <div className='aside-option' data-id={idGenre}>
      <p className='aside-option-icon'>
        <img src={imageUrl} alt={genreName} />
      </p>
      <p className='aside-option-text'>{genreName}</p>
    </div>
  );
}

export default Asideoption;
