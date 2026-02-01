import { FaPlusCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const HeaderComponent = ({ onCreateGroup }) => {
  const { t } = useTranslation();
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-8">
      <h2 className="text-3xl font-extrabold text-blue-800 mb-4 md:mb-0">
      {t("groups")}
      </h2>
      <button
        className="flex items-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full px-6 py-2 shadow-lg transition transform hover:scale-105"
        onClick={onCreateGroup}
      >
        <FaPlusCircle /> <span>{t("create_new_group")}</span>
      </button>
    </header>
  );
};

export default HeaderComponent;
