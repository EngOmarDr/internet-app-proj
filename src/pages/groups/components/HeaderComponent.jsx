import { FaPlusCircle } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const HeaderComponent = ({ onCreateGroup }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-4 md:mb-0">
        Groups
      </h2>
      <button
        className="flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2 shadow-lg transition transform hover:scale-105"
        onClick={onCreateGroup}
      >
        <FaPlusCircle /> <span>Create New Group</span>
      </button>
    </header>
  );
};

export default HeaderComponent;
