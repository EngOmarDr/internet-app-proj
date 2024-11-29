import { useEffect, useState } from "react";
import { FaTrashAlt, FaUserFriends, FaTimes } from "react-icons/fa";
import { deleteUserFromTheSystem, getAllUsers } from "../../services/SystemAdminService";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AllUsers(){
    const [seeGroupsUserIn , setSeeGroupsUserIn] = useState(false)
    const [allUsers,setAllUsers] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchAllUsers() {
            try {
            const response = await getAllUsers();
            const usersData = response.data
            Toastify({
                text: `${response.message}`,
                duration: 5000,
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

const handelDeletUser = async (id) => {
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
            const response = await deleteUserFromTheSystem(id)
            MySwal.fire(
                'Deleted!',
                `${response.message}`,
                'success'
            );
            setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            MySwal.fire(
                'Error!',
                `${error.message}`,
                'error'
            );
        }
    }
}
const users = allUsers.map((user) => {
    return  <>
            <div className="user" key={user.id}>
                <h3>{user.username}</h3>
                <h3>{user.email}</h3>
                <h3>{user.roles[0].name}</h3>
                <div className="options">
                    <button onClick={()=> setSeeGroupsUserIn(true)}>
                        <FaUserFriends className="icon-user-friends" />
                    </button>
                    <button onClick={()=> handelDeletUser(user.id)}>
                        <FaTrashAlt className="icon-trash" />
                    </button>
                </div>
            </div>
            </>
})

    //for testing    
    const arr = new Array(10).fill(1)
    const groupsIn = arr.map(()=> {
        return  <>
                    <div className="group-dash">
                        <h1>Group Name</h1>
                        <FaTrashAlt className="icon-trash" />
                    </div>
                </>
    })

    return(
        <div className="all-users-continar">
            {loading && <LoadingSpinner/>}
            {users}
            {seeGroupsUserIn && (
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
            )}
        </div>
    )
}