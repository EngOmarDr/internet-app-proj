/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import UserSearchComponent from "./userSearchComponent";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <FaTimes
          className="text-gray-600 cursor-pointer float-right"
          onClick={() => setShowCreateGroup(false)}
        />
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
        {t("create_new_group")}
        </h3>
        <input
          type="text"
          placeholder={t("group_name")}
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
          {t("create_new_group")}
        </button>
      </div>
    </div>
  );
};

export default CreateGroupModalComponent;
