/* eslint-disable react/prop-types */
import { FaCog } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const GroupCardComponent = ({ group, onViewFiles, onManageGroup }) => {
  const adminUser =
    group?.users?.find((user) => user.role && user.role.includes("admin")) ||
    null;

  const { t } = useTranslation();

  return (
    <div
      key={group?.id}
      className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition transform hover:scale-105 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold text-blue-800 mb-2">
          {group?.name || "Unknown Group"}
        </h3>
        <p className="text-gray-600">
          {t("group_id")}: {group?.id || t("not_available")}
        </p>
        <p className="text-gray-600">
          {t("created_by")}: {adminUser ? adminUser.username : t("no_admin_assigned")}
        </p>
        <p className="text-gray-600">
          {t("member_count")}: {group?.users?.length || 0}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-y-4 sm:gap-x-4 mt-4">
        <button
          className="flex items-center space-x-2 text-white font-semibold px-4 py-2 w-full sm:w-auto rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-md transform hover:scale-105 transition-all duration-200"
          onClick={() => onViewFiles(group?.id)}
        >
          <FaFolderOpen /> <span>{t("view_files")}</span>
        </button>
          <button
            className="flex items-center space-x-2 text-white font-semibold px-4 py-2 w-full sm:w-auto rounded-lg bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 shadow-md transform hover:scale-105 transition-all duration-200"
            onClick={() => onManageGroup(group)}
          >
            <FaCog /> <span>{t("manage_group")}</span>
          </button>
        
      </div>
    </div>
  );
};

export default GroupCardComponent;
