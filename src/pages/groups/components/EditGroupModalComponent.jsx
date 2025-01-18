/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import UserSearchComponent from "./userSearchComponent";
import { useTranslation } from "react-i18next";
import UserOperations from "../../../components/users/UserOperations";
import GroupOperations from "../../../components/users/GroupOperations";

const EditGroupModalComponent = ({
  selectedGroup,
  setShowManageGroup,
  handleManageSearch,
  manageSearchQuery,
  setManageSearchQuery,
  manageSearchResults,
  manageUserIds,
  handleAddUserToManage,
  handleUpdateGroup,
  handleRemoveUser,
  setEditGroupName,
}) => {
  const { t } = useTranslation();
  const [showUserOperations, setShowUserOperations] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowOperations = (user) => {
    setSelectedUser(user);
    setShowUserOperations(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={() => setShowManageGroup(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Header */}
        <h3 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          {t("edit_group_label")}:{" "}
          <span className="text-gray-800">{selectedGroup.name}</span>
        </h3>

        {/* Group Name Input */}
        <input
          type="text"
          defaultValue={selectedGroup.name}
          onChange={(e) => setEditGroupName(e.target.value)}
          className="w-full p-4 mb-6 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* User Search */}
        <UserSearchComponent
          onSubmit={handleManageSearch}
          searchQuery={manageSearchQuery}
          setSearchQuery={setManageSearchQuery}
          searchResults={manageSearchResults}
          handleAddUser={handleAddUserToManage}
          userIds={manageUserIds}
        />

        {/* Update Group Button */}
        <button
          onClick={handleUpdateGroup}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 mt-4"
        >
          {t("update_group")}
        </button>

        {/* Scrollable Users Table */}
        <div className="mt-6 overflow-y-auto max-h-64 border rounded-lg shadow-lg">
          <table className="w-full text-left bg-white">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white sticky top-0 z-10">
              <tr>
                <th className="p-4 font-medium">{t("name")}</th>
                <th className="p-4 font-medium">{t("email")}</th>
                <th className="p-4 font-medium">{t("role")}</th>
                <th className="p-4 font-medium text-center">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {selectedGroup.users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b last:border-none hover:bg-gray-100 transition"
                >
                  <td className="p-4 text-gray-700">{user.username}</td>
                  <td className="p-4 text-gray-700">{user.email}</td>
                  <td className="p-4 text-gray-700">{user.role}</td>
                  <td className="p-4 text-center space-y-4">
                    {/* Remove User Button */}
                    <button
                      className="text-red-600 hover:text-red-800 flex items-center justify-center space-x-2 transition-transform transform hover:scale-110 py-2 px-4 rounded-lg shadow-md"
                      onClick={() =>
                        handleRemoveUser(selectedGroup.id, user.id)
                      }
                    >
                      <FaTrashAlt />
                      <span>{t("remove")}</span>
                    </button>

                    {/* View Operations Button */}
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center justify-center space-x-2 transition-transform transform hover:scale-110 py-2 px-4 rounded-lg shadow-md"
                      onClick={() => handleShowOperations(user)}
                    >
                      <span>{t("view_operations")}</span>
                    </button>

                    {/* Download CSV and PDF Buttons */}
                    <GroupOperations
                      groupId={selectedGroup.id}
                      userId={user.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for User Operations */}
      {showUserOperations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl relative">
            <button
              onClick={() => setShowUserOperations(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-transform transform hover:scale-110"
            >
              <FaTimes className="text-2xl" />
            </button>
            <UserOperations
              groupId={selectedGroup.id}
              userId={selectedUser.id}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditGroupModalComponent;
