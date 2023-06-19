import React, { useState } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import placeholder from '../../Resources/Assets/img/placeholder.png';

const UserProfile = () => {
  const [name, setName] = useState('Ejemplo');
  const [tempName, setTempName] = useState(name);
  const [image, setImage] = useState(placeholder);
  const [tempImage, setTempImage] = useState(image);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setTempName(name);
    setTempImage(image);
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    setName(tempName);
    setImage(tempImage);
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setTempName(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='userProfile'>
      <Avatar src={tempImage} alt="Profile Picture" sx={{ width: 150, height: 150 }} />
      {isEditing ? (
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
      ) : (
        <Button onClick={handleEditClick}>Editar imagen</Button>
      )}
      <TextField
        label="Nombre"
        value={tempName}
        disabled={!isEditing}
        onChange={handleNameChange}
        fullWidth
        margin="normal"
      />
      {isEditing && (
        <div>
          <Button onClick={handleSaveClick}>Guardar Cambios</Button>
          <Button onClick={handleCancelClick}>Cancelar</Button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
