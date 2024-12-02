/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import UserSearchComponent from "./userSearchComponent";

const CreateGroupModalComponent = ({
  setShowCreateGroup,
  handleCreateGroup,
  newGroupName,
  setNewGroupName,
  handleSearch,
  searchQuery,
  setSearchQuery,
  searchResults,
  handleAddUser,
  userIds,
}) => {
  return (
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
          className="w-full p-2 mb-4 border rounded-lg"
        />

        <UserSearchComponent
          onSubmit={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          handleAddUser={handleAddUser}
          userIds={userIds}
        />

        <button
          onClick={handleCreateGroup}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModalComponent;
