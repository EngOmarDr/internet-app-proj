import { useEffect, useState } from "react";
import "./Groups.css";
import {
  indexGroup,
  storeGroup,
  removeUserFromGroup,
  updateGroup,
} from "../../services/groupService";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../services/users";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import HeaderComponent from "./components/HeaderComponent";
import GroupListComponent from "./components/GroupListComponent";
import EditGroupModalComponent from "./components/EditgroupModalComponent";
import CreateGroupModalComponent from "./components/CreateGroupModalComponent";

const Groups = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showManageGroup, setShowManageGroup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [groups, setGroups] = useState([]);
  const [editGroupName, setEditGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [manageSearchQuery, setManageSearchQuery] = useState("");
  const [manageSearchResults, setManageSearchResults] = useState([]);
  const [manageUserIds, setManageUserIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGroups() {
      try {
        const groupsData = await indexGroup();
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
        Toastify({
          text: "Error fetching groups: " + error.message,
          duration: 5000,
          close: true,
          gravity: "top",
          position: "center",
          backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
          stopOnFocus: true,
        }).showToast();
      } finally {
        setLoading(false);
      }
    }
    fetchGroups();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getUsers(searchQuery);
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Toastify({
        text: "Error fetching users: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const handleManageSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getUsers(manageSearchQuery);
      setManageSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Toastify({
        text: "Error fetching users: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const handleAddUser = (userId) => {
    if (userIds.includes(userId)) {
      setUserIds(userIds.filter((id) => id !== userId));
    } else {
      setUserIds([...userIds, userId]);
    }
  };

  const handleAddUserToManage = (userId) => {
    if (manageUserIds.includes(userId)) {
      setManageUserIds(manageUserIds.filter((id) => id !== userId));
    } else {
      setManageUserIds([...manageUserIds, userId]);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const newGroup = await storeGroup(newGroupName, userIds);
      setGroups([...groups, newGroup]);
      setNewGroupName("");
      setUserIds([]);
      setShowCreateGroup(false);
    } catch (error) {
      console.error("Error creating group:", error);
      Toastify({
        text: "Error creating group: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const handleShowFiles = (groupId) => {
    navigate(`${groupId}/files`);
  };

  const handleManageGroup = (group) => {
    setSelectedGroup(group);
    setEditGroupName(group.name);
    setManageUserIds(group.users.map((user) => user.id));
    setShowManageGroup(true);
  };

  const handleRemoveUser = async (groupId, userId) => {
    try {
      await removeUserFromGroup(groupId, userId);

      // تحديث حالة المستخدمين في المجموعة الحالية
      setSelectedGroup((prevSelectedGroup) => ({
        ...prevSelectedGroup,
        users: prevSelectedGroup.users.filter((user) => user.id !== userId),
      }));

      // تحديث قائمة المجموعات الأصلية في حال تم عرض المجموعة ضمنها
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === groupId
            ? {
                ...group,
                users: group.users.filter((user) => user.id !== userId),
              }
            : group
        )
      );

      Toastify({
        text: "تم إزالة المستخدم بنجاح",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #56ab2f, #a8e063)",
      }).showToast();
    } catch (error) {
      console.error("Error removing user:", error);
      Toastify({
        text: "خطأ في إزالة المستخدم: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  const handleUpdateGroup = async () => {
    if (!selectedGroup || !selectedGroup.id) {
      Toastify({
        text: "لم يتم تحديد أي مجموعة للتحديث",
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
      }).showToast();
      return;
    }

    // تعريف المتغيرات للمستخدمين الذين سيتم إضافتهم أو حذفهم
    const addedUserIds = manageUserIds.filter(
      (id) => !selectedGroup.users.some((user) => user.id === id)
    );
    const removedUserIds = selectedGroup.users
      .filter((user) => !manageUserIds.includes(user.id))
      .map((user) => user.id);

    try {
      const updatedGroup = await updateGroup(
        selectedGroup.id,
        editGroupName,
        addedUserIds,
        removedUserIds
      );

      console.log(updatedGroup);

      // تحديث قائمة المجموعات في حال نجاح التحديث
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === selectedGroup.id ? updatedGroup : group
        )
      );

      // إعادة تعيين الحالة بعد التحديث
      setShowManageGroup(false);
      setManageUserIds([]);
      setSelectedGroup(updatedGroup);

      Toastify({
        text: "تم تحديث المجموعة بنجاح",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #56ab2f, #a8e063)",
      }).showToast();
    } catch (error) {
      console.error("Error updating group:", error);
      Toastify({
        text: "خطأ في تحديث المجموعة: " + error.message,
        duration: 5000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #FF5F6D, #FFC371)",
        stopOnFocus: true,
      }).showToast();
    }
  };

  return (
    <div className="p-6 ">
      <HeaderComponent onCreateGroup={() => setShowCreateGroup(true)} />
      <GroupListComponent
        groups={groups}
        onViewFiles={handleShowFiles}
        onManageGroup={handleManageGroup}
        onCreateGroup={() => setShowCreateGroup(true)}
        loading={loading}
      />
      {showManageGroup && selectedGroup && (
        <EditGroupModalComponent
        selectedGroup={selectedGroup}
        setShowManageGroup={setShowManageGroup}
        handleManageSearch={handleManageSearch}
        manageSearchQuery={manageSearchQuery}
        setManageSearchQuery={setManageSearchQuery}
        manageSearchResults={manageSearchResults}
        manageUserIds={manageUserIds}
        handleAddUserToManage={handleAddUserToManage}
        handleUpdateGroup={handleUpdateGroup}
        handleRemoveUser={handleRemoveUser}
        setEditGroupName={setEditGroupName}
      />
      )}
      {showCreateGroup && (
        <CreateGroupModalComponent

        setShowCreateGroup={setShowCreateGroup}
        handleCreateGroup={handleCreateGroup}
        newGroupName={newGroupName}
        setNewGroupName={setNewGroupName}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchResults={searchResults}
        handleAddUser={handleAddUser}
        userIds={userIds}
      />
      )}
    </div>
  );
};

export default Groups;
