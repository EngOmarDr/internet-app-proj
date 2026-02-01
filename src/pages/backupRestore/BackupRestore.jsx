// BackupRestore.js

import './BackupRestore.css';

const BackupRestore = () => {
  const backups = [
    { id: 1, date: '2024-10-01' },
    { id: 2, date: '2024-10-10' },
    { id: 3, date: '2024-10-15' },
  ];

  const createBackup = () => {
    alert('Backup created successfully!');
  };

  const restoreBackup = (backupDate) => {
    if (window.confirm(`Are you sure you want to restore the backup from ${backupDate}?`)) {
      alert('Backup restored successfully!');
    }
  };

  return (
    <div className="backup-restore">
      <h2>Backup & Restore</h2>
      <button className="backup-btn" onClick={createBackup}>Create Backup</button>
      <h3>Available Backups:</h3>
      <ul className="backup-list">
        {backups.map(backup => (
          <li key={backup.id} className="backup-item">
            <span>{backup.date}</span>
            <button className="restore-btn" onClick={() => restoreBackup(backup.date)}>Restore</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BackupRestore;
