import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Groups from './components/groups/Groups';
import Files from './components/files/Files';
import Reports from './components/reports/Reports';
import BackupRestore from './components/backupRestore/BackupRestore';
import Notifications from './components/notifications/Notifications';
import Login from './components/login/login';
import Register from './components/register/register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/files" element={<Files />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/backup" element={<BackupRestore />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
