/* eslint-disable react/prop-types */
const UserSearchComponent = ({
  onSubmit,
  searchQuery,
  setSearchQuery,
  searchResults,
  handleAddUser,
  userIds,
}) => {
  return (
    <form onSubmit={onSubmit} className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search users by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-3 border rounded-lg flex-grow"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Search
      </button>

      <ul className="max-h-60 overflow-y-auto mt-4">
        {searchResults.map((user) => (
          <li key={user.id} className="flex justify-between items-center">
            <span>{user.username}</span>
            <button
              onClick={() => handleAddUser(user.id)}
              className={`px-4 py-2 rounded-lg ${
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
    </form>
  );
};

export default UserSearchComponent;
