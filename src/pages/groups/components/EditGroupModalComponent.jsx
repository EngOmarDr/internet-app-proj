/* eslint-disable react/prop-types */
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import UserSearchComponent from "./userSearchComponent";

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
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-2xl">
        <FaTimes
          className="text-gray-600 cursor-pointer float-right text-2xl hover:text-gray-800"
          onClick={() => setShowManageGroup(false)}
        />
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
          Edit Group: {selectedGroup.name}
        </h3>
        <input
          type="text"
          defaultValue={selectedGroup.name}
          className="w-full p-3 mb-4 border rounded-lg"
        />
        <UserSearchComponent
          onSubmit={handleManageSearch}
          searchQuery={manageSearchQuery}
          setSearchQuery={setManageSearchQuery}
          searchResults={manageSearchResults}
          handleAddUser={handleAddUserToManage}
          userIds={manageUserIds}
        />
        <button
          onClick={handleUpdateGroup}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg mt-4"
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
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                  <button
                    className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                    onClick={() => handleRemoveUser(selectedGroup.id, user.id)}
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
  );
};

export default EditGroupModalComponent;
