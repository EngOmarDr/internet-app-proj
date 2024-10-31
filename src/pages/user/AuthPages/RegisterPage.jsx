// RegisterPage.jsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import './AuthPages.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await AuthService.register(username, email, password, confirmPassword);
      localStorage.setItem('authToken', response.data.token); // حفظ الـ Token
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>تسجيل حساب جديد</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">إنشاء حساب</button>
        </form>
        <p>لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
