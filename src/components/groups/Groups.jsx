// Groups.js

import React, { useState } from 'react';
import './Groups.css';
import { FaUserPlus, FaFolderOpen, FaCog, FaPlusCircle, FaTimes } from 'react-icons/fa';

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
//   const [members, setMembers] = useState([]);
  const groups = [
    { id: 1, name: "Developers", creator: "John Doe", membersCount: 12 },
    { id: 2, name: "Designers", creator: "Jane Smith", membersCount: 8 },
    { id: 3, name: "Managers", creator: "Alice Johnson", membersCount: 5 },
  ];

  const handleCreateGroup = () => {
    // Handle group creation logic here
    setShowCreateGroup(false);
  };

  return (
    <div className="groups">
      <header className="groups-header">
        <h2>Groups</h2>
        <button className="add-group-button" onClick={() => setShowCreateGroup(true)}>
          <FaPlusCircle /> Create New Group
        </button>
      </header>

      <div className="groups-list">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <h3>{group.name}</h3>
            <p>Created by: {group.creator}</p>
            <p>Members: {group.membersCount}</p>
            <div className="group-actions">
              <button className="action-button">
                <FaFolderOpen /> View Files
              </button>
              <button className="action-button manage">
                <FaCog /> Manage Group
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateGroup && (
        <div className="create-group-modal">
          <div className="modal-content">
            <FaTimes className="close-modal" onClick={() => setShowCreateGroup(false)} />
            <h3>Create New Group</h3>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Add members by search"
              className="input-field"
            />
            <button className="action-button" onClick={handleCreateGroup}>
              <FaUserPlus /> Add Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Groups;


// // Groups.js

// import React from 'react';
// import './Groups.css';
// import { FaPlusCircle, FaUserPlus, FaTrashAlt } from 'react-icons/fa';

// const Groups = () => {
//   return (
//     <div className="groups">
//       <header className="groups-header">
//         <h2>Groups Management</h2>
//         <p>Create, manage, and collaborate in groups efficiently</p>
//         <button className="add-group-button">
//           <FaPlusCircle /> Create New Group
//         </button>
//       </header>

//       <div className="groups-list">
//         {[1, 2, 3].map((group) => (
//           <div key={group} className="group-card">
//             <h3>Group {group}</h3>
//             <p>Manage access and permissions within this group.</p>
//             <div className="group-actions">
//               <button className="action-button">
//                 <FaUserPlus /> Invite Members
//               </button>
//               <button className="action-button delete">
//                 <FaTrashAlt /> Delete Group
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Groups;
