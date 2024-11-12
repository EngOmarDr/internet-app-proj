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
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import LoadingSpinner from "../../components/LoadingSpinner";

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showManageGroup, setShowManageGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [editGroupName, setEditGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [manageSearchQuery, setManageSearchQuery] = useState("");
  const [manageSearchResults, setManageSearchResults] = useState([]);
  const [manageUserIds, setManageUserIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groupsData = await indexGroup();
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
        Toastify({
          text: "Error fetching groups: " + error.message,
          duration: 5000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
          stopOnFocus: true,
        }).showToast();
      } finally {
        setLoading(false);
      }
    }
    fetchGroups();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getUsers(searchQuery);
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Toastify({
        text: "Error fetching users: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const handleManageSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getUsers(manageSearchQuery);
      setManageSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Toastify({
        text: "Error fetching users: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const handleAddUser = (userId) => {
    if (userIds.includes(userId)) {
      setUserIds(userIds.filter((id) => id !== userId));
    } else {
      setUserIds([...userIds, userId]);
    }
  };

  const handleAddUserToManage = (userId) => {
    if (manageUserIds.includes(userId)) {
      setManageUserIds(manageUserIds.filter((id) => id !== userId));
    } else {
      setManageUserIds([...manageUserIds, userId]);
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
      Toastify({
        text: "Error creating group: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const handleShowFiles = (groupId) => {
    navigate(`${groupId}/files`);
  };

  const handleManageGroup = (group) => {
    setSelectedGroup(group);
    setEditGroupName(group.name);
    setManageUserIds(group.users.map((user) => user.id));
    setShowManageGroup(true);
  };

  const handleRemoveUser = async (groupId, userId) => {
    try {
      await removeUserFromGroup(groupId, userId);
  
      // تحديث حالة المستخدمين في المجموعة الحالية
      setSelectedGroup((prevSelectedGroup) => ({
        ...prevSelectedGroup,
        users: prevSelectedGroup.users.filter((user) => user.id !== userId),
      }));
  
      // تحديث قائمة المجموعات الأصلية في حال تم عرض المجموعة ضمنها
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId
            ? { ...group, users: group.users.filter((user) => user.id !== userId) }
            : group
        )
      );
  
      Toastify({
        text: "تم إزالة المستخدم بنجاح",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #56ab2f, #a8e063)",
      }).showToast();
    } catch (error) {
      console.error("Error removing user:", error);
      Toastify({
        text: "خطأ في إزالة المستخدم: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };
  

  const handleUpdateGroup = async () => {
    if (!selectedGroup || !selectedGroup.id) {
      Toastify({
        text: "لم يتم تحديد أي مجموعة للتحديث",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
      }).showToast();
      return;
    }
  
    // تعريف المتغيرات للمستخدمين الذين سيتم إضافتهم أو حذفهم
    const addedUserIds = manageUserIds.filter(
      (id) => !selectedGroup.users.some((user) => user.id === id)
    );
    const removedUserIds = selectedGroup.users
      .filter((user) => !manageUserIds.includes(user.id))
      .map((user) => user.id);
  
    try {
      const updatedGroup = await updateGroup(
        selectedGroup.id,
        editGroupName,
        addedUserIds,
        removedUserIds
      );
  
      // تحديث قائمة المجموعات في حال نجاح التحديث
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === selectedGroup.id ? updatedGroup : group
        )
      );
  
      // إعادة تعيين الحالة بعد التحديث
      setShowManageGroup(false);
      setManageUserIds([]);
      setSelectedGroup(updatedGroup);
  
      Toastify({
        text: "تم تحديث المجموعة بنجاح",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #56ab2f, #a8e063)",
      }).showToast();
    } catch (error) {
      console.error("Error updating group:", error);
      Toastify({
        text: "خطأ في تحديث المجموعة: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
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
      <div>
        {loading ? (
          <LoadingSpinner />
        ) : (
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
                const adminUser = group.users.find(
                  (user) => user.role === "admin"
                );
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
                        className="flex items-center space-x-2 text-white font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md transform hover:scale-105 transition-all duration-200"
                        onClick={() => handleShowFiles(group.id)}
                      >
                        <FaFolderOpen /> <span>View Files</span>
                      </button>

                      {adminUser && (
                        <button
                          className="flex items-center space-x-2 text-white font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 shadow-md transform hover:scale-105 transition-all duration-200"
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
        )}
      </div>
      {showManageGroup && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-2xl transform transition-all duration-300">
            <FaTimes
              className="text-gray-600 cursor-pointer float-right text-2xl hover:text-gray-800 transition"
              onClick={() => setShowManageGroup(false)}
            />
            <h3 className="text-2xl font-semibold text-blue-800 mb-4 border-b pb-2">
              Edit Group: {selectedGroup.name}
            </h3>
            <input
              type="text"
              value={editGroupName}
              onChange={(e) => setEditGroupName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Edit Group Name"
            />
            <form
              onSubmit={handleManageSearch}
              className="flex items-center mb-4"
            >
              <input
                type="text"
                placeholder="Search users by name..."
                value={manageSearchQuery}
                onChange={(e) => setManageSearchQuery(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition"
              >
                Search
              </button>
            </form>
            <ul className="max-h-60 overflow-y-auto rounded-lg border border-gray-200 mb-4 shadow-inner">
              {manageSearchResults.map((user) => (
                <li
                  key={user.id}
                  className="p-3 flex justify-between items-center border-b border-gray-200 last:border-none"
                >
                  <span className="font-medium">{user.username}</span>
                  <button
                    onClick={() => handleAddUserToManage(user.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      manageUserIds.includes(user.id)
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    {manageUserIds.includes(user.id) ? "Remove" : "Add"}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpdateGroup}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg mt-4 transition transform hover:scale-105"
            >
              Update Group
            </button>
            <table className="w-full text-left mt-6 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Email</th>
                  <th className="p-3 font-semibold">Role</th>
                  <th className="p-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedGroup.users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b last:border-none hover:bg-gray-100 transition"
                  >
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3">
                      <button
                        className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                        onClick={() =>
                          handleRemoveUser(selectedGroup.id, user.id)
                        }
                      >
                        <FaTrashAlt /> <span>Remove</span>
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
