// ثم استيراد AuthRepository بدلًا من AuthService في RegisterPage.jsx إذا كنت تريد استخدام الـ Repository.

// repositories/AuthRepository.js

import AuthService from '../services/AuthService';

const registerUser = async (username, email, password, password_confirmation) => {
  return await AuthService.register(username, email, password, password_confirmation);
};

export default {
  registerUser,
};
