import { NavLink, Outlet } from "react-router-dom";
import { FaChevronRight, FaChevronLeft, FaBars } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import './appDashboard.css'
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AppDashboard(){
    const { t } = useTranslation();
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
                <h1 className={`nav-header ${hideNav ? 'hide' : ''}`}>{t("appDashboard")}</h1>
                <NavLink 
                    to='.' 
                    className={`nav-link slide ${hideNav ? 'hide' : ''}`}  
                    style={({isActive})=> isActive ? activeStyleObj : null }
                    end
                    data-tooltip-id="my-tooltip-groups" 
                    data-tooltip-place="right-end"
                >
                    {t("allgroups")} 
                </NavLink>

                <NavLink 
                    to='allUsers' 
                    className={`nav-link slide ${hideNav ? 'hide' : ''}`}  
                    style={({isActive})=> isActive ? activeStyleObj : null }
                    data-tooltip-id="my-tooltip-users" 
                    data-tooltip-place="right-end"
                >
                    {t("allusers")} 
                </NavLink>
                <Tooltip 
                    id="my-tooltip-groups" 
                    className="tooltip"
                    content={t('groupsTip')}
                />
                <Tooltip 
                    id="my-tooltip-users" 
                    className="tooltip"
                    content={t('usersTip')}
                />
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
                <h1 className='nav-header'>{t("appDashboard")}</h1>
                <NavLink 
                    to='.' 
                    className='nav-link slide'  
                    style={({isActive})=> isActive ? activeStyleObj : null }
                    end
                    data-tooltip-id="my-tooltip-groups" 
                    data-tooltip-place="top-end"
                >
                    {t("allgroups")} 
                </NavLink>
                <NavLink 
                    to='allUsers' 
                    className='nav-link slide'   
                    style={({isActive})=> isActive ? activeStyleObj : null }
                    data-tooltip-id="my-tooltip-users" 
                    data-tooltip-place="bottom-end"
                >
                    {t("allusers")}  
                </NavLink>
                <Tooltip 
                    id="my-tooltip-groups" 
                    className="tooltip"
                    content={t('groupsTip')}
                />
                <Tooltip 
                    id="my-tooltip-users" 
                    className="tooltip"
                    content={t('usersTip')}
                />
            </div>
            }
            <div className="outlet">
                <div className="statistics">
                    <div className="stat">
                        <h1>{t("topUsers")}</h1>
                        <h3>Group Name</h3>
                    </div>
                    <div className="stat">
                        <h1>{t("mostActive")}</h1>
                        <h3>UserName</h3>
                    </div>
                    <div className="stat">
                        <h1>{t("topFiles")}</h1>
                        <h3>Group Name</h3>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    )
} 