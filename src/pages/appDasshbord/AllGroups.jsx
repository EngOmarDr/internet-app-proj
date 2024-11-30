import { useState, useEffect } from "react";
import { FaFolderOpen, FaUsers, FaTrashAlt, FaTimes} from "react-icons/fa";
import LoadingSpinner from "../../components/LoadingSpinner";
import { removeUserFromGroup } from "../../services/groupService";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { deleteFileFromSystem, deleteGroupFromTheSystem, getAllGroups, getGroupFiles } from "../../services/SystemAdminService";

export default function AllGroups(){

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
            Toastify({
                text: `All Users Has Been Fetch Correctly`,
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
        title: 'Are you sure you want to delete this user ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
        try {
            await removeUserFromGroup(groupId,userId)
            MySwal.fire(
                'Deleted!',
                `User Has Been Deleted `,
                'success'
            );
            setGroupInfo((prev) => ({...prev, groupMembers: prev.groupMembers.filter((user) => user.id !== userId)}));
        } catch (error) {
            MySwal.fire(
                'Error!',
                `${error.message}`,
                'error'
            );
        }
    }
}
async function handelDeleteGroup(groupId) {
    const result = await MySwal.fire({
        title: 'Are you sure you want to delete this Group ?',
        text: "The Group Will Be Deleted With It's Files!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
        try {
            await deleteGroupFromTheSystem(groupId)
            MySwal.fire(
                'Deleted!',
                `Group Has Been Deleted `,
                'success'
            );
            SetAllGroups(prev=> prev.filter(group=> group.id !== groupId))
        } catch (error) {
            MySwal.fire(
                'Error!',
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
        title: 'Are you sure you want to delete this file ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
        try {
            await deleteFileFromSystem(fileId)
            MySwal.fire(
                'Deleted!',
                `file Has Been Deleted `,
                'success'
            );
            setGroupInfo((prev) => ({...prev, groupFiles: prev.groupFiles.filter((user) => user.id !== fileId)}));
        } catch (error) {
            MySwal.fire(
                'Error!',
                `${error.message}`,
                'error'
            );
        }
    }
}
const groups = allGroups.map((group) => {
    const groupOwnerInfo = group.users.filter((user)=> user.role === 'admin' )
    const groupOwnerName = groupOwnerInfo[0].name;
    return  <>
            <div className="group-dash" key={group.id}>
                <h3>{group.name}</h3>
                <h3>OwnedBy: {groupOwnerName}</h3>
                <div className="options">
                    <button onClick={()=> handelSeeGroupFiles(group.id)}>
                        <FaFolderOpen className="icon-folder" />
                    </button>
                    <button onClick={()=> handelSeeGroupUsers(group.users,group.id)}>
                        <FaUsers className="icon-users" />
                    </button>
                    <button onClick={()=> handelDeleteGroup(group.id)}>
                        <FaTrashAlt className="icon-trash" />
                    </button>
                </div>
            </div>
            </>
})
    const membersTable = 
    (
        <table className="w-full text-left mt-6 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Role</th>
                <th className="p-3 font-semibold">Actions</th>
            </tr>
            </thead>
            <tbody>
            {groupInfo.groupMembers.map((user) => (
                <tr
                key={user.id}
                className="border-b last:border-none hover:bg-gray-100 transition"
                >
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3">
                    <button
                    className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                    onClick={() => handleRemoveUser(groupInfo.groupId, user.id)}
                    >
                    <FaTrashAlt /> <span>Remove</span>
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
        ? <h1 style={{fontWeight:'bold'}}>There Is Now File In This Group Yet ! </h1> 
        : <table className="w-full text-left mt-6 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
            <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Actions</th>
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
                    <FaTrashAlt /><span>Remove</span>
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
    return(
        <div className="all-groups-continar">
            {loading && <LoadingSpinner/>}
            {groups}
            {seeGroupUsers && (
                <div className="group-users-outlay">
                    <div className="group-users">
                        <div className="info">
                            <h1>Members In This Group:</h1>
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
                            <h1>Files In This Group:</h1>
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
        </div>
    )
}