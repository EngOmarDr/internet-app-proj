/* eslint-disable react/prop-types */
import LoadingSpinner from "../../../components/LoadingSpinner"
import GroupCardComponent from "./GroupCardComponent"
import { useTranslation } from "react-i18next";

const GroupListComponent = ({ groups, onViewFiles, onManageGroup, onCreateGroup, loading }) => {
  const { t } = useTranslation();
  return (
    <>
    {loading ? (
      <LoadingSpinner />
    ) : groups.length === 0 ? (
      <p className="col-span-full text-center text-gray-600 text-lg">
        {t("no_groups_found")}. {t("do_you_want_to")}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={onCreateGroup}
        >
          {" "}
          {t("add_one")}
        </span>
        ?
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {groups.map((group) => (
          <GroupCardComponent
            key={group.id}
            group={group}
            onViewFiles={onViewFiles}
            onManageGroup={onManageGroup}
          />
        ))}
      </div>
    )}
  </>
  )
}

export default GroupListComponent
