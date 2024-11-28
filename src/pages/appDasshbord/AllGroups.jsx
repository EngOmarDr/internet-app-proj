import { useState } from "react";
import { FaFolderOpen, FaUsers, FaTrashAlt, FaTimes} from "react-icons/fa";
import {  useNavigate } from "react-router-dom";

export default function AllGroups(){

    const [seeGroupUsers , setSeeGroupUsers] = useState(false);
    const navigat = useNavigate();
    const arr = new Array(15).fill(1)
    {/* i'll make a seprate component for the group letter >>> just for testing now ! */}
    const groups = arr.map(() => {
        return  <>
                <div className="group-dash">
                    <h3>group Name</h3>
                    <div className="options">
                        <button onClick={()=> navigat('/groups/1/files')}>
                            <FaFolderOpen className="icon-folder" />
                        </button>
                        <button onClick={()=> setSeeGroupUsers(true)}>
                            <FaUsers className="icon-users" />
                        </button>
                        <FaTrashAlt className="icon-trash" />
                    </div>
                </div>
                </>
    })
    const members = arr.map(()=> {
        return  <>
                    <div className="member">
                        <h1>UserName</h1>
                        <FaTrashAlt className="icon-trash" />
                    </div>
                </>
    })
    return(
        <div className="all-groups-continar">
            {groups}
            {seeGroupUsers && (
                <div className="group-users-outlay">
                    <div className="group-users">
                        <div className="info">
                            <h1>Members In This Group:</h1>
                            <FaTimes onClick={() => setSeeGroupUsers(false)}/>
                        </div>
                        <div className="members">
                            {members}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}