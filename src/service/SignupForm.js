import axios from 'axios';

const API_URL = 'http://3.34.53.57:8080';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkDuplicateId = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/users/checkId`, {id});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const checkDuplicateNickname = async (nickname) => {
  try {
    const response = await axios.post(`${API_URL}/users/checkNickname`,{nickname});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const sendEmailVerification = async (id, email) => {
  try {
    const response = await axios.post(`${API_URL}/mailsend`
        , {loginId:id, email}
        , { withCredentials: true });
    console.dir(response)
    return response.data;
  } catch (error) {
    // throw error.response.data;
    console.dir(error)
  }
};

export const verifyAuthNumber = async (id, email, authNumber) => {
  try {
    const response = await axios.post(`${API_URL}/mailableCheck`
        , { loginId:id, email, authNum:authNumber }
        , { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const verifyPassword = async (password, checkPassword) => {
  try {
    const response = await axios.post(`${API_URL}/users/checkPassword`
        , { password, checkPassword }
        , { withCredentials: true })
    return response.data;
  }catch (error){
    throw error.response.data;
  }
}

export const registerArtist = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/invite/artist`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerEnter = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/invite/entertainment`, userData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerAdmin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/admin`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};