import React, { useState } from 'react';
import { Button, Grid, Modal, TextField } from '@mui/material';
import logo from '../../Resources/Assets/img/logo_circle.png';
import { registerUser } from '../../API/laravelAPI';
import Cookies from 'js-cookie';
import axios from 'axios';

const RegisterModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userProfilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setEmail('');
    setPassword('');
    setUserName('');
    setProfilePicture(null);
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();
  
      formData.append('email', email);
      formData.append('password', password);
      formData.append('userName', userName);
      formData.append('userProfilePicture', userProfilePicture);
  
      // Realizar la solicitud de registro y obtener la respuesta
      const response = await registerUser(formData);
  
      sessionStorage.setItem('access_token', response.access_token);
  
      handleClose();
  
      window.location.reload();
    } catch (error) {
      setError('Failed to register. Please check your information.');
    }
  };
  
  

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div className="userButton">
      <Button variant="contained" color="primary" fullWidth onClick={handleOpen} style={{ backgroundColor: '#40d8d8' }}>
        Register
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '400px',
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
              <TextField
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff', border: '1px solid #f5fbff' },
                  className: 'register-input',
                  placeholder: 'Email',
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ color: '#ffffff', border: '1px solid #f5fbff' }}
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff', border: '1px solid #f5fbff' },
                  className: 'register-input',
                  placeholder: 'Password',
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                style={{ color: '#ffffff', border: '1px solid #f5fbff' }}
                fullWidth
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff', border: '1px solid #f5fbff' },
                  className: 'register-input',
                  placeholder: 'Name',
                }}
              />
            </Grid>
            <Grid item>
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </Grid>
            {error && (
              <Grid item>
                <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
              </Grid>
            )}
            <Grid item>
              <Button variant="contained" color="primary" fullWidth onClick={handleRegister} style={{ backgroundColor: '#40d8d8' }}>
                Register
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterModal;
