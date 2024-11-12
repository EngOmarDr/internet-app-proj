
import AuthService from '../services/AuthService';

const registerUser = async (username, email, password, password_confirmation) => {
  return await AuthService.register(username, email, password, password_confirmation);
};

export default {
  registerUser,
};
