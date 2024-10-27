// Dashboard.js

import React from 'react';
import './Dashboard.css';
import { FaFileAlt, FaUsers, FaClipboardList, FaDatabase } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome to FileManager Dashboard</h2>
        <p>Your file management and collaboration hub</p>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-card card-files">
          <FaFileAlt className="card-icon" />
          <h3>Manage Files</h3>
          <p>Upload, edit, and organize files with ease</p>
          <button className="card-button">Go to Files</button>
        </div>
        
        <div className="dashboard-card card-groups">
          <FaUsers className="card-icon" />
          <h3>Manage Groups</h3>
          <p>Create, invite, and collaborate with teams</p>
          <button className="card-button">Go to Groups</button>
        </div>
        
        <div className="dashboard-card card-reports">
          <FaClipboardList className="card-icon" />
          <h3>Reports</h3>
          <p>View activity logs and generate insights</p>
          <button className="card-button">View Reports</button>
        </div>
        
        <div className="dashboard-card card-backup">
          <FaDatabase className="card-icon" />
          <h3>Backup & Restore</h3>
          <p>Keep your files safe with backup solutions</p>
          <button className="card-button">Manage Backups</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
