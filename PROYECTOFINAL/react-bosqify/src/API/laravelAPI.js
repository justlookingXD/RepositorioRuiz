import axios from 'axios';

const laravel = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});

const laravelAPI = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
});

export const getCsrfToken = async () => {
  try {
    const response = await laravel.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};


export const loginUser = async (credentials) => {
  try {
    const response = await laravelAPI.post('/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const getGenres = async () => {
   // Obtener y establecer el token CSRF antes de realizar la solicitud
  try {
    const response = await laravelAPI.get('/getGenres');
    return response.data;
  } catch (error) {
    console.error('Error during get genres:', error);
    throw error;
  }
};

export const saveTrack = async (dataIn) => {
   // Obtener y establecer el token CSRF antes de realizar la solicitud
  try {
    const response = await laravelAPI.post('/saveTrack', dataIn);
    return response.data;
  } catch (error) {
    console.error('Error during get saves:', error);
    throw error;
  }
};

export const deleteTrack = async (dataIn) => {
  // Obtener y establecer el token CSRF antes de realizar la solicitud
 try {
   const response = await laravelAPI.post('/deleteTrack', dataIn);
   return response.data;
 } catch (error) {
   console.error('Error during get del:', error);
   throw error;
 }
};

export const editTrack = async (dataIn) => {
  // Obtener y establecer el token CSRF antes de realizar la solicitud
 try {
   const response = await laravelAPI.post('/editTrack', dataIn);
   return response.data;
 } catch (error) {
   console.error('Error during get edit:', error);
   throw error;
 }
};

export const getTrack = async (idTrackIn) => {
   // Obtener y establecer el token CSRF antes de realizar la solicitud
  try {
    const response = await laravelAPI.get(`/track/${idTrackIn}`);
    return response.data;
  } catch (error) {
    console.error('Error during get genres:', error);
    throw error;
  }
};

export const allTracksUser = async () => {
   // Obtener y establecer el token CSRF antes de realizar la solicitud
  try {
    const response = await laravelAPI.post('/allTracksUser');
    return response.data;
  } catch (error) {
    console.error('Error during get genres:', error);
    throw error;
  }
};

export const getUser = async (info) => {
    const response = await laravelAPI.get('/user');
    return response.data;
}

export const registerUser = async (credentials) => {
    
    try {
        const response = await laravelAPI.post('/register', credentials);
        return response.data;
    } catch (error) {
        console.error('Error during register:', error);
        throw error;
    }
    
}
