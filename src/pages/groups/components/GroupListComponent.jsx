/* eslint-disable react/prop-types */
import LoadingSpinner from "../../../components/LoadingSpinner"
import GroupCardComponent from "./GroupCardComponent"

const GroupListComponent = ({ groups, onViewFiles, onManageGroup, onCreateGroup, loading }) => {
  console.log(groups)
  return (
    <>
    {loading ? (
      <LoadingSpinner />
    ) : groups.length === 0 ? (
      <p className="col-span-full text-center text-gray-600 text-lg">
        You do not have a group. Do you want to
        <span
          className="text-blue-600 cursor-pointer"
          onClick={onCreateGroup}
        >
          {" "}
          add one
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
