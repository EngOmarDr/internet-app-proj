import { NavLink, Outlet } from "react-router-dom";
import './appDashboard.css'

export default function AppDashboard(){

    const activeStyleObj = {
        color: '#f39c12',
    }
    return(
        <div className="app-dashboard-continar"> 
            <div className="app-dashboard-nav">

                <NavLink 
                    to='.' 
                    className='nav-link slide' 
                    style={({isActive})=> isActive ? activeStyleObj : null }
                    end
                >
                    All Groups 
                </NavLink>


                <NavLink 
                    to='allUsers' 
                    className='nav-link slide' 
                    style={({isActive})=> isActive ? activeStyleObj : null }
                >
                    All Users 
                </NavLink>

            </div>
            <div className="outlet">
                <div className="statistics">
                    <div className="stat">
                        <h1>Top User Group</h1>
                        <h3>Group Name</h3>
                    </div>
                    <div className="stat">
                        <h1>Most Active User</h1>
                        <h3>UserName</h3>
                    </div>
                    <div className="stat">
                        <h1>File-Heavy Group</h1>
                        <h3>Group Name</h3>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )
} 