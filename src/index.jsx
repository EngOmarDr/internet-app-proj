import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Groups from './pages/groups/Groups';
import Files from './pages/files/Files';
import Reports from './pages/reports/Reports';
import BackupRestore from './pages/backupRestore/BackupRestore';
import Notifications from './pages/notifications/Notifications';
import Login from './pages/login/login.jsx';
import Register from './pages/register/register.jsx';
import AccountSettingsPage from './pages/user/setting/AccountSettingsPage.jsx';
import HomePage from './pages/Home.jsx';
import AboutPage from './pages/about/AboutPage.jsx';
import UsersPage from './components/users/UsersPage.jsx';
import './utils/i18n.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="groups" element={<Groups />} />
          <Route path="groups/:groupId/files" element={<Files />} />
          <Route path="reports" element={<Reports />} />
          <Route path="backup" element={<BackupRestore />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="/account-settings" element={<AccountSettingsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
