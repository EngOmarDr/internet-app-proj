// Notifications.js

import './Notifications.css';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'File edited by User1', date: '2024-10-26', type: 'edit' },
    { id: 2, message: 'File checked out by User2', date: '2024-10-25', type: 'checkout' },
    { id: 3, message: 'File restored by User3', date: '2024-10-24', type: 'restore' },
  ];

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul className="notification-list">
        {notifications.map(notification => (
          <li key={notification.id} className={`notification-item ${notification.type}`}>
            <span className="notification-message">{notification.message}</span>
            <span className="notification-date">{notification.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
