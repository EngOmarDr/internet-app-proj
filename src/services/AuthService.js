
import axios from 'axios';
import { getToken } from 'firebase/messaging';
import { messaging } from '../utils/firebaseConfig';

const API_URL = 'http://127.0.0.1:8000/api';

const register = async (username, email, password, password_confirmation) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
      password_confirmation,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });
    const { VITE_APP_VAPID_KEY } = import.meta.env;
    let token;
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      token = await getToken(messaging, {
        vapidKey: VITE_APP_VAPID_KEY,
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }

    console.log(token);
    if (token) {
      const fcmtoken = await axios.post(`${API_URL}/fcm_token`, {
        user_id: response.data.data.id,
        fcm_token: token,
      }, {
        headers: {
          Accept: 'application/json',
        },
      });
      console.log(fcmtoken);
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  }, {
    headers: {
      'Accept': 'application/json',
    },
  });
  const { VITE_APP_VAPID_KEY } = import.meta.env;
  let token;
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });

    console.log(token);

    //We can send token to server
    console.log("Token generated : ", token);
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }

  if (response.status === 200) {
    if (token) {


      await axios.post(`${API_URL}/fcm_token`, {
        user_id: response.data.data.id,
        fcm_token: token,
      }, {
        headers: {
          Authorization: `Bearer ${response.data.data.access_token}`,
          Accept: 'application/json',
        },
      });
    }
  } else {
    return response.data.message
  }
  return response.data;

};

export default {
  register,
  loginUser,
};
