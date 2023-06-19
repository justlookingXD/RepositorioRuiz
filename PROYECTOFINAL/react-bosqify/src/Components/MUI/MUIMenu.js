//Importaciones necesarias
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Cookies from 'js-cookie';
import { getUser } from '../../API/laravelAPI';
import { Link } from 'react-router-dom';

export default function AccountMenu() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showOptions, setShowOptions] = React.useState(window.innerWidth > 900);
  const [userInfo, setUserInfo] = React.useState(null); // Estado para almacenar la información del usuario

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    Cookies.remove('rememberMeCookie');
    sessionStorage.removeItem('access_token');
    window.location.reload();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Llama a la función para obtener la información del usuario una vez se renderiza el componente
  useEffect(() => {
    const handleResize = () => {
      setShowOptions(window.innerWidth > 950);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

    const fetchUserInfo = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token') || Cookies.get('access_token');
        const user = await getUser(accessToken);
        setUserInfo(user);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        {showOptions && (
          <>
            <Typography sx={{ display: 'flex', alignItems: 'center', minWidth: 100, marginLeft: '1.5vw' }}>
              <FavoriteIcon />
              <Link to="/favoritos" className="playlist-text">Favoritos</Link>
            </Typography>
            <Typography sx={{ display: 'flex', alignItems: 'center', minWidth: 100, marginLeft: '1.5vw' }}>
              <CloudUploadIcon />
              <Link to="/subidas" className="playlist-text">Subidas</Link>
            </Typography>
          </>
        )}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {userInfo ? (<Avatar sx={{ width: 32, height: 32 }}>{userInfo.avatar}</Avatar>) : (<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>)}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <a href="http://localhost:8000/api/aboutme" download>
            About Me
          </a>
        </MenuItem>
        {!showOptions && (
          <>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <FavoriteIcon fontSize="small" />
              </ListItemIcon>
              <Link to="/favoritos">Favoritos</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <CloudUploadIcon fontSize="small" />
              </ListItemIcon>
              <Link to="/subidas">Subidas</Link>
            </MenuItem>
          </>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
