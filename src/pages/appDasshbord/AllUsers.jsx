import { useEffect, useState } from "react";
import { FaTrashAlt, FaInfoCircle  } from "react-icons/fa";
import { deleteUserFromTheSystem, getAllUsers } from "../../services/SystemAdminService";
import { useTranslation } from "react-i18next";
import Toastify from "toastify-js";
import { Tooltip } from 'react-tooltip'
import "toastify-js/src/toastify.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AllUsers(){
    const { t } = useTranslation();
    // const [seeGroupsUserIn , setSeeGroupsUserIn] = useState(false)
    const [allUsers,setAllUsers] = useState([])
    const [userInfo,setUserInfo] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchAllUsers() {
            try {
            const response = await getAllUsers();
            const usersData = response.data
            Toastify({
                text: `${response.message}`,
                duration: 2000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #56ab2f, #a8e063)",
                stopOnFocus: true,
                }).showToast();
            // console.log(usersData);
            setAllUsers(usersData);
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
        fetchAllUsers();
}, []);
const MySwal = withReactContent(Swal)
function handelShowUserInfo(userId){
    setUserInfo(userId)
}
const handelDeletUser = async (id) => {
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
            await deleteUserFromTheSystem(id)
            MySwal.fire(
                t("deletingDone"),
                t("deletingUserSuccessfullyMsg"),
                'success'
            );
            setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            MySwal.fire(
                t("error_occurred"),
                `${error.message}`,
                'error'
            );
        }
    }
}
const users =
<table className="w-full text-left mt-6 bg-gray-50 rounded-lg shadow-lg overflow-hidden">
<thead className="bg-blue-600 text-white">
<tr>
    <th className="p-3 font-semibold">{t("name")}</th>
    <th className="p-3 font-semibold email-th">{t("email")}</th>
    <th className="p-3 font-semibold role-th">{t("role")}</th>
    <th className="p-3 font-semibold act" colSpan={3}>{t("actions")}</th>
</tr>
</thead>
<tbody>
{allUsers.map((user) => (
    <tr
    key={user.id}
    className="border-b last:border-none hover:bg-gray-100 transition act"
    >
    <td className="p-3">{user.username}</td>
    <td className="p-3 email-td">{user.email}</td>
    <td className="p-3 role-td">{user.roles[0].name}</td>
    {/* <td className="p-3">
        <button onClick={()=> setSeeGroupsUserIn(true)}>
            <FaUserFriends className="icon-user-friends" />
        </button>
    </td> */}
    <td className="p-3">
        <button onClick={()=> handelDeletUser(user.id)}>
            <FaTrashAlt className="icon-trash" />
        </button>
    </td>
    <td className="p-3 info-td">
        <FaInfoCircle className="icon-info" 
            data-tooltip-id="info-tooltip" 
            data-tooltip-place="right"
            style={{cursor:"pointer"}}
            onMouseEnter={()=>{
                handelShowUserInfo(user.id)
            }} 
        />
        {
            userInfo === user.id &&
            <Tooltip 
                id="info-tooltip" 
                className="users-tooltip" 
                content={`${t("role")}: ${user.roles[0].name} |  ${t("email")}: ${user.email}`}
            />
        }
    </td>
    </tr>
))}
</tbody>
</table>

    // //for testing    
    // const arr = new Array(10).fill(1)
    // const groupsIn = arr.map(()=> {
    //     return  <>
    //                 <div className="group-dash">
    //                     <h1>Group Name</h1>
    //                     <FaTrashAlt className="icon-trash" />
    //                 </div>
    //             </>
    // })

    return(
        <div className="all-users-continar">
            {loading ? <LoadingSpinner/> :  users}
            {/* {seeGroupsUserIn && (
                <div className="group-users-outlay">
                <div className="group-users">
                    <div className="info">
                        <h1>Groups User In:</h1>
                        <FaTimes onClick={() => setSeeGroupsUserIn(false)}/>
                    </div>
                    <div className="groups-in">
                        {groupsIn}
                    </div>
                </div>
            </div>
            )} */}
        </div>
    )
}