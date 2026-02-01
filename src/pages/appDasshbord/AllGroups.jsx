import { useState, useEffect } from "react";
import { FaFolderOpen, FaUsers, FaTrashAlt, FaTimes} from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import { removeUserFromGroup } from "../../services/groupService";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Toastify from "toastify-js";
import { Tooltip } from 'react-tooltip'
import { useTranslation } from "react-i18next";
import "toastify-js/src/toastify.css";
import { deleteFileFromSystem, deleteGroupFromTheSystem, getAllGroups, getGroupFiles } from "../../services/SystemAdminService";

export default function AllGroups(){
    const { t } = useTranslation();
    const [seeGroupUsers , setSeeGroupUsers] = useState(false);
    const [seeGroupFiles , setSeeGroupFiles] = useState(false);
    const [allGroups,SetAllGroups] = useState([]);
    // I put Info case i want to catch the groupId to pass it to the removeUserFromGroup and getGroupFiles functions
    const [groupInfo,setGroupInfo] = useState({groupId: 0, groupMembers: [] , groupFiles: [] });
    const [loading, setLoading] = useState(true);
    const [loadingFiles, setLoadingFiles] = useState(true);

    useEffect(() => {
        async function fetchAllGroups() {
            try {
            const response = await getAllGroups();
            const groupsData = response.data
            console.log(groupsData);
            
            Toastify({
                text: t("groupsFetchCorrectly"),
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #56ab2f, #a8e063)",
                stopOnFocus: true,
                }).showToast();
            console.log(groupsData);
            SetAllGroups(groupsData);
            } catch (error) {
            Toastify({
                text: "Error fetching Users: " + error.message,
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
        fetchAllGroups();
}, []);
function handelSeeGroupUsers(groupUsersArray,groupId) {
    setGroupInfo((prev) => ({...prev, groupId:groupId, groupMembers:groupUsersArray}))
    setSeeGroupUsers(true)
}
const MySwal = withReactContent(Swal)
async function handleRemoveUser(groupId,userId) {
    const result = await MySwal.fire({
        title: t("deletUser?"),
        text: t("deleteWarning"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: t("confirmDeleting"),
        cancelButtonText: t("close"),
    });

    if (result.isConfirmed) {
        try {
            await removeUserFromGroup(groupId,userId)
            MySwal.fire(
                t("deletingDone"),
                t("deletingUserSuccessfullyMsg"),
                'success'
            );
            setGroupInfo((prev) => ({...prev, groupMembers: prev.groupMembers.filter((user) => user.id !== userId)}));
        } catch (error) {
            MySwal.fire(
                t("error_occurred"),
                `${error.message}`,
                'error'
            );
        }
    }
}
async function handelDeleteGroup(groupId) {
    const result = await MySwal.fire({
        title: t("deletGroup?"),
        text: t("deleteWarning"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: t("confirmDeleting"),
        cancelButtonText: t("close"),
    });

    if (result.isConfirmed) {
        try {
            await deleteGroupFromTheSystem(groupId)
            MySwal.fire(
                t("deletingDone"),
                t("deletingGroupSuccessfullyMsg"),
                'success'
            );
            SetAllGroups(prev=> prev.filter(group=> group.id !== groupId))
        } catch (error) {
            MySwal.fire(
                t("error_occurred"),
                `${error.message}`,
                'error'
            );
        }
    }
}
async function handelSeeGroupFiles(groupId) {
    try {
        setSeeGroupFiles(true)
        const response = await getGroupFiles(groupId)
        const filesData = response.data;
        setGroupInfo(prev=> ({...prev, groupFiles: filesData}))
    } catch (error) {
        console.log(error);
        
    } finally{
        setLoadingFiles(false)
    }
}
async function handleRemoveFile(fileId) {
    const result = await MySwal.fire({
        title: t("deletFile?"),
        text: t("deleteWarning"),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: t("confirmDeleting"),
        cancelButtonText: t("close"),
    });
    
    if (result.isConfirmed) {
        try {
            await deleteFileFromSystem(fileId)
            MySwal.fire(
                t("deletingDone"),
                t("deletingFileSuccessfullyMsg"),
                'success'
            );
            setGroupInfo((prev) => ({...prev, groupFiles: prev.groupFiles.filter((user) => user.id !== fileId)}));
        } catch (error) {
            MySwal.fire(
                t("error_occurred"),
                `${error.message}`,
                'error'
            );
        }
    }
}

const groups =
<table className="w-full text-left mt-6 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
<thead className="bg-blue-600 text-white">
<tr>
    <th className="p-3 font-semibold">{t("name")}</th>
    <th className="p-3 font-semibold act" colSpan={3}>{t("actions")}</th>
</tr>
</thead>
<tbody>
{allGroups.map((group) => (
    <tr
    key={group.id}
    className="border-b last:border-none hover:bg-gray-100 transition act"
    >
    <td className="p-3">{group.name}</td>
    <td className="p-3">
        <button 
            onClick={()=> handelSeeGroupFiles(group.id)}
            data-tooltip-id="files-tooltip" 
            data-tooltip-place="right-start"
        >
            <FaFolderOpen className="icon-folder" />
        </button>
    </td>
    <td className="p-3">
        <button 
        
            onClick={()=> handelSeeGroupUsers(group.users,group.id)}
            data-tooltip-id="users-tooltip" 
            data-tooltip-place="right-start"
        >
            <FaUsers className="icon-users" />
        </button>
    </td>
    <td className="p-3">
        <button onClick={()=> handelDeleteGroup(group.id)}>
            <FaTrashAlt className="icon-trash" />
        </button>
    </td>
    </tr>
))}
</tbody>
</table>
    const membersTable = 
    (
        <table className="w-full text-left mt-6 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="p-3 font-semibold">{t("name")}</th>
                <th className="p-3 font-semibold">{t("email")}</th>
                <th className="p-3 font-semibold">{t("role")}</th>
                <th className="p-3 font-semibold">{t("action")}</th>
            </tr>
            </thead>
            <tbody>
            {groupInfo.groupMembers.map((user) => (
                <tr
                key={user.id}
                className="border-b last:border-none hover:bg-gray-100 transition"
                >
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                    <button
                    className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                    onClick={() => handleRemoveUser(groupInfo.groupId, user.id)}
                    >
                    <FaTrashAlt /> <span>{t("remove")}</span>
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
    const filesTable = 
    (
        groupInfo.groupFiles.length === 0 
        ? <h1 style={{fontWeight:'bold'}}>{t("noFilesYet")}</h1> 
        : <table className="w-full text-left mt-6 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="p-3 font-semibold">{t("name")}</th>
                <th className="p-3 font-semibold">{t("actions")}</th>
            </tr>
            </thead>
            <tbody>
            {groupInfo.groupFiles.map((file) => (
                <tr
                key={file.id}
                className="border-b last:border-none hover:bg-gray-100 transition"
                >
                <td className="p-3">{file.name}</td>
                <td className="p-3">
                    <button
                    className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                    onClick={() => handleRemoveFile(file.id)}
                    >
                    <FaTrashAlt /><span>{t("remove")}</span>
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
    return(
        <div className="all-groups-continar">
            {loading ? <LoadingSpinner/> : groups}
            {seeGroupUsers && (
                <div className="group-users-outlay">
                    <div className="group-users">
                        <div className="info">
                            <h1>{t("membersIn")}</h1>
                            <FaTimes onClick={() => setSeeGroupUsers(false)}/>
                        </div>
                        <div className="members">
                            {membersTable}
                        </div>
                    </div>
                </div>
            )}
            {seeGroupFiles && (
                <div className="group-users-outlay">
                    <div className="group-users">
                        <div className="info">
                            <h1>{t("filesIn")}</h1>
                            <FaTimes onClick={() => {setSeeGroupFiles(false);setLoadingFiles(true)}}/>
                        </div>
                        <div className="members">
                            {
                                loadingFiles 
                                ? <LoadingSpinner/>
                                : filesTable
                            }
                        </div>
                    </div>
                </div>
            )}
            <Tooltip id="users-tooltip" className="users-tooltip" content={t("manageMembers")}/>
            <Tooltip id="files-tooltip" className="files-tooltip" content={t("manageFiles")}/>
        </div>
    )
}