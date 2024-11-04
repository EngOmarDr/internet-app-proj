
import { useEffect, useState } from 'react';
import './Groups.css';
import { FaFolderOpen, FaCog, FaPlusCircle, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { indexGroup, storeGroup, removeUserFromGroup } from '../../services/groupService';
import { useNavigate } from 'react-router-dom';

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showManageGroup, setShowManageGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groupsData = await indexGroup();
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    }
    fetchGroups();
  }, []);

  const handleCreateGroup = async () => {
    try {
      const newGroup = await storeGroup(newGroupName, userIds);
      setGroups([...groups, newGroup]);
      setNewGroupName("");
      setUserIds([]);
      setShowCreateGroup(false);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleShowFiles = (groupId) => {
    navigate(`${groupId}/files`);
  };


  const handleManageGroup = (group) => {
    setSelectedGroup(group);
    setShowManageGroup(true);
  };

  
  const handleRemoveUser = async (groupId, userId) => {
    try {
      await removeUserFromGroup(groupId, userId);
      setSelectedGroup({
        ...selectedGroup,
        users: selectedGroup.users.filter(user => user.id !== userId),
      });
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-4 md:mb-0">Groups</h2>
        <button
          className="flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2 shadow-lg transition transform hover:scale-105"
          onClick={() => setShowCreateGroup(true)}
        >
          <FaPlusCircle /> <span>Create New Group</span>
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groups.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 text-lg">
            You do not have a group. Do you want to 
            <span className="text-blue-600 cursor-pointer" onClick={() => setShowCreateGroup(true)}> add one</span>?
          </p>
        ) : (
          groups.map((group) => (
            <div key={group.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition transform hover:scale-105 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{group.name}</h3>
                <p className="text-gray-600">Group ID: {group.id}</p>
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-700">Members:</h4>
                  <ul className="space-y-2 mt-2">
                    {group.users.map((user) => (
                      <li key={user.id} className="flex flex-col bg-gray-50 p-3 rounded-lg">
                        <div className="text-gray-700 font-semibold">{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold mt-1 ${user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {user.role}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold mt-1 ${user.approved ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                          {user.approved ? "Approved" : "Pending"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex space-x-4 mt-4 justify-center">
                <button
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition"
                  onClick={() => handleShowFiles(group.id)}
                >
                  <FaFolderOpen /> <span>View Files</span>
                </button>
                {group.users.some((user) => user.role === 'admin') && (
                  <button
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-semibold transition"
                    onClick={() => handleManageGroup(group)}
                  >
                    <FaCog /> <span>Manage Group</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showManageGroup && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <FaTimes className="text-gray-600 cursor-pointer float-right" onClick={() => setShowManageGroup(false)} />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">{selectedGroup.name}</h3>
            <table className="w-full text-left mb-4">
              <thead>
                <tr>
                  <th className="border-b-2 p-2">Name</th>
                  <th className="border-b-2 p-2">Email</th>
                  <th className="border-b-2 p-2">Role</th>
                  <th className="border-b-2 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedGroup.users.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.role}</td>
                    <td className="p-2">
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleRemoveUser(selectedGroup.id, user.id)}
                      >
                        <FaTrashAlt /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <FaTimes className="text-gray-600 cursor-pointer float-right" onClick={() => setShowCreateGroup(false)} />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">Create New Group</h3>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Add members by search (IDs)"
              value={userIds.join(",")}
              onChange={(e) => setUserIds(e.target.value.split(",").map(id => id.trim()))}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleCreateGroup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition transform hover:scale-105"
            >
              Create Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Groups;


