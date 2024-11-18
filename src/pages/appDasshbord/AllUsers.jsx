import { useState } from "react";
import { FaTrashAlt, FaUserFriends, FaTimes } from "react-icons/fa";

export default function AllUsers(){
    const [seeGroupsUserIn , setSeeGroupsUserIn] = useState(false)
    const arr = new Array(10).fill(1)
    {/* i'll make a seprate component for the user-div letter >>> just for testing now ! */}
    const users = arr.map(() => {
        return  <>
                <div className="user">
                    <h3>UserName</h3>
                    <h3>Email</h3>
                    <div className="options">
                        <button onClick={()=> setSeeGroupsUserIn(true)}>
                            <FaUserFriends className="icon-user-friends" />
                        </button>
                        <FaTrashAlt className="icon-trash" />
                    </div>
                </div>
                </>
    })
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