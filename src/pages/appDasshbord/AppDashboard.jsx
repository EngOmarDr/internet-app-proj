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
                    className='nav-link' 
                    style={({isActive})=> isActive ? activeStyleObj : null }
                    end
                >
                    All Groups 
                </NavLink>


                <NavLink 
                    to='allUsers' 
                    className='nav-link' 
                    style={({isActive})=> isActive ? activeStyleObj : null }
                >
                    All Users 
                </NavLink>

            </div>
            <Outlet/>
        </div>
    )
} 