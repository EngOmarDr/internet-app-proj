/* eslint-disable react/prop-types */
import { FaSearch, FaUserPlus, FaUserMinus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const UserSearchComponent = ({
  onSubmit,
  searchQuery,
  setSearchQuery,
  searchResults,
  handleAddUser,
  userIds,
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit} className="mb-6">
      {/* Search Input */}
      <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />
        <button
          type="submit"
          className="ml-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 flex items-center space-x-2"
        >
          <FaSearch />
          <span>{t("search")}</span>
        </button>
      </div>

      {/* Search Results */}
      <ul className="mt-4 max-h-60 overflow-y-auto bg-white shadow-md rounded-lg divide-y divide-gray-200">
        {searchResults.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center text-blue-600 font-semibold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 font-medium">{user.username}</span>
            </div>
            <button
              onClick={() => handleAddUser(user.id)}
              className={`px-4 py-2 rounded-lg text-sm flex items-center space-x-2 ${
                userIds.includes(user.id)
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } transition duration-300 transform hover:scale-105`}
            >
              {userIds.includes(user.id) ? (
                <>
                  <FaUserMinus />
                  <span>{t("remove_user")}</span>
                </>
              ) : (
                <>
                  <FaUserPlus />
                  <span>{t("add_user")}</span>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default UserSearchComponent;
