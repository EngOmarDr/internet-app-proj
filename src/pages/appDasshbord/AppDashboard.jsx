import { NavLink, Outlet } from "react-router-dom";
import { FaChevronRight, FaChevronLeft, FaBars } from "react-icons/fa";
import './appDashboard.css'
import { useState } from "react";

export default function AppDashboard(){

    const activeStyleObj = {
        color: '#f39c12',
    }
    const [hideNav , setHideNav ] = useState(false)
    const [menutoggle , setMenutoggle ] = useState(false)
    function handelHideNav(){
        setHideNav(prev => !prev)
    }
    function handelToggleMenue (){
        setMenutoggle(prev => !prev)
    }
    return(
        <div className="app-dashboard-continar">
            <div className={`app-dashboard-nav ${hideNav ? 'hide' : ''}`}>
                <h1 className={`nav-header ${hideNav ? 'hide' : ''}`}>App Dashhboard</h1>
                <NavLink 
                    to='.' 
                    className={`nav-link slide ${hideNav ? 'hide' : ''}`}  
                    style={({isActive})=> isActive ? activeStyleObj : null }
                    end
                >
                    All Groups 
                </NavLink>


                <NavLink 
                    to='allUsers' 
                    className={`nav-link slide ${hideNav ? 'hide' : ''}`}  
                    style={({isActive})=> isActive ? activeStyleObj : null }
                >
                    All Users 
                </NavLink>

                <button className="hide-nav" onClick={()=>handelHideNav()}>
                    {
                        hideNav
                        ?<FaChevronRight className="icon-simple-arrow" />
                        :<FaChevronLeft className="icon-simple-arrow" />
                        
                    }
                </button>
            </div>
            <FaBars className="appDashboard-menu-toggle" onClick={()=>handelToggleMenue()} />
            {
                menutoggle 
                &&
                <div className="mobile-appDashboard-menue">
                <h1 className='nav-header'>App Dashhboard</h1>
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
            }
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