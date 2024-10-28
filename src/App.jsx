// App.js

import './App.css'; // ملف CSS لتصميم التطبيق
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // استيراد المكتبات اللازمة

import Dashboard from './components/dashboard/Dashboard';    
import Header from './components/header/Header';
import Groups from './components/groups/Groups';
import Files from './components/files/Files';
import Reports from './components/reports/Reports';
import BackupRestore from './components/backupRestore/BackupRestore';
import Notifications from './components/notifications/Notifications';

const App = () => {
  return (
    <Router> {/* تغليف التطبيق بـ BrowserRouter */}
      <div className="app">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/files" element={<Files />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/backup" element={<BackupRestore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/" element={<Dashboard />} /> {/* توجيه الصفحة الرئيسية إلى Dashboard */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
