// src/pages/LoginPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import './AuthPages.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await AuthService.loginUser(username, password);

      if (data.status === 1 && data.data.token) {
        localStorage.setItem('authToken', data.data.token);
        navigate('/dashboard'); // إعادة توجيه إلى الصفحة الرئيسية بعد تسجيل الدخول
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>تسجيل الدخول</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">تسجيل الدخول</button>
        </form>
        <p>
          ليس لديك حساب؟ <Link to="/register">سجل الآن</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
