import Cookies from 'js-cookie';
import axios from 'axios';


const checkAuth = async () => {
  const token = Cookies.get('token');

  if (!token) {
    console.log('No token found in sessionStorage');
    return false;
  }

  try {
    const response = await axios.get(`https://back-api-cvlq.onrender.com/api/auth/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Axios does not have response.ok like fetch; check for status instead
    if (response.status !== 200) {
      console.log('Response sttatus - ', response.status);
    }

    const data = response.data;
    if (data ) {
      console.log('Token verification response - ', data);
      return true;
    } else {
      console.log('Token verification response invalid');
    }
  } catch (err) {
    console.error('Token verification error:', err);
    Cookies.remove('token');
    return false;
  }
};

export default checkAuth;
