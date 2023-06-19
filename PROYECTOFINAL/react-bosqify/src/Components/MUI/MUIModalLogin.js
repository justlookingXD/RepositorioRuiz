import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, Modal, TextField } from '@mui/material';
import logo from '../../Resources/Assets/img/logo_circle.png';
import { loginUser } from '../../API/laravelAPI';
import Cookies from 'js-cookie';

const LoginModal = () => {
  const [open, setOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleLogin = async () => {
    try {
      
      const response = await loginUser({
        email: email,
        password: password,
      });
  
      if (rememberMe) {
        Cookies.set('rememberMeCookie', 'true', { expires: 7 });
        Cookies.set('access_token', response.access_token, { expires: 7 });
      } else {
        sessionStorage.setItem('access_token', response.access_token);
      }

      handleClose();

      window.location.reload();

    } catch (error) {
      console.log(error);
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className='userButton'>
      <Button variant="contained" color="primary" fullWidth onClick={handleOpen} style={{ backgroundColor: '#40d8d8' }}>
        Log in
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div
          style={{
            width: '300px',
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
                  className: 'login-input',
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
                  className: 'login-input',
                  placeholder: 'Password',
                }}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    style={{ color: '#ffffff' }}
                  />
                }
                label="Remember me"
                style={{ color: '#ffffff' }}
              />
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
                onClick={handleLogin}
                style={{ backgroundColor: '#40d8d8' }}
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;
