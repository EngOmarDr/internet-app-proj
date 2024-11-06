import { useEffect, useState } from "react";
import "./Groups.css";
import {
  FaFolderOpen,
  FaCog,
  FaPlusCircle,
  FaTimes,
  FaTrashAlt,
} from "react-icons/fa";
import {
  indexGroup,
  storeGroup,
  removeUserFromGroup,
  updateGroup,
} from "../../services/groupService";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/users";

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showManageGroup, setShowManageGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [editGroupName, setEditGroupName] = useState("");
  const [newUserIds, setNewUserIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // حالة البحث
  const [searchResults, setSearchResults] = useState([]); // نتائج البحث
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

  // تنفيذ البحث عن المستخدمين
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getUsers(searchQuery);
      setSearchResults(data.data); // تخزين نتائج البحث
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // إضافة المستخدم إلى القائمة
  const handleAddUser = (userId) => {
    if (userIds.includes(userId)) {
      setUserIds(userIds.filter((id) => id !== userId));
    } else {
      setUserIds([...userIds, userId]);
    }
  };

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
    setEditGroupName(group.name);
    setShowManageGroup(true);
  };

  const handleRemoveUser = async (groupId, userId) => {
    try {
      await removeUserFromGroup(groupId, userId);
      setSelectedGroup({
        ...selectedGroup,
        users: selectedGroup.users.filter((user) => user.id !== userId),
      });
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      const updatedGroup = await updateGroup(
        selectedGroup.id,
        editGroupName,
        newUserIds
      );
      setGroups(
        groups.map((group) =>
          group.id === selectedGroup.id ? updatedGroup : group
        )
      );
      setShowManageGroup(false);
      setNewUserIds([]);
    } catch (error) {
      console.error("Error updating group:", error);
    }
  };

  return (
    <div className="p-6 ">
      <header className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-4 md:mb-0">
          Groups
        </h2>
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
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setShowCreateGroup(true)}
            >
              {" "}
              add one
            </span>
            ?
          </p>
        ) : (
          groups.map((group) => {
            const adminUser = group.users.find((user) => user.role === "admin");
            return (
              <div
                key={group.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition transform hover:scale-105 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {group.name}
                  </h3>
                  <p className="text-gray-600">Group ID: {group.id}</p>
                  <p className="text-gray-600">
                    Created by: {adminUser ? adminUser.name : "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Members Count: {group.users.length}
                  </p>
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                  <button
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition"
                    onClick={() => handleShowFiles(group.id)}
                  >
                    <FaFolderOpen /> <span>View Files</span>
                  </button>
                  {adminUser && (
                    <button
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 font-semibold transition"
                      onClick={() => handleManageGroup(group)}
                    >
                      <FaCog /> <span>Manage Group</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {showManageGroup && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <FaTimes
              className="text-gray-600 cursor-pointer float-right"
              onClick={() => setShowManageGroup(false)}
            />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Edit Group: {selectedGroup.name}
            </h3>
            <input
              type="text"
              value={editGroupName}
              onChange={(e) => setEditGroupName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Edit Group Name"
            />
            <input
              type="text"
              placeholder="Add new members by IDs"
              value={newUserIds.join(",")}
              onChange={(e) =>
                setNewUserIds(e.target.value.split(",").map((id) => id.trim()))
              }
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleUpdateGroup}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition transform hover:scale-105"
            >
              Update Group
            </button>
            <table className="w-full text-left mt-4">
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
                        onClick={() =>
                          handleRemoveUser(selectedGroup.id, user.id)
                        }
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
            <FaTimes
              className="text-gray-600 cursor-pointer float-right"
              onClick={() => setShowCreateGroup(false)}
            />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4">
              Create New Group
            </h3>
            <input
              type="text"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            {/* مربع البحث عن المستخدمين */}
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                placeholder="Search users by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
            {/* عرض نتائج البحث */}
            <ul className="max-h-60 overflow-y-auto">
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  className="p-2 flex justify-between items-center border-b border-gray-300"
                >
                  <span>{user.username}</span>
                  <button
                    onClick={() => handleAddUser(user.id)}
                    className={`px-4 py-2 rounded-lg transition ${
                      userIds.includes(user.id)
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {userIds.includes(user.id) ? "Remove" : "Add"}
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={handleCreateGroup}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition transform hover:scale-105"
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
