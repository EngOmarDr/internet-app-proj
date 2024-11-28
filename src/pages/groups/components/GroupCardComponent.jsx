/* eslint-disable react/prop-types */
import { FaCog } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";

const GroupCardComponent = ({ group, onViewFiles, onManageGroup }) => {
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
        <p className="text-gray-600">Member Count: {group.users.length}</p>
      </div>

      <div className="flex space-x-4 mt-4 justify-center">
        <button
          className="flex items-center space-x-2 text-white font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md transform hover:scale-105 transition-all duration-200"
          onClick={() => onViewFiles(group.id)}
        >
          <FaFolderOpen /> <span>View Files</span>
        </button>

        {adminUser && (
          <button
            className="flex items-center space-x-2 text-white font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 shadow-md transform hover:scale-105 transition-all duration-200"
            onClick={() => onManageGroup(group)}
          >
            <FaCog /> <span>Manage Group</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupCardComponent;
