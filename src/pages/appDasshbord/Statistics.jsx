import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMostActiveUser , groupWithMostUsers , groupWithMostFiles } from "../../services/SystemAdminService";
import LoadingSpinner from "../../components/LoadingSpinner";

export function Statistics(){

    const { t } = useTranslation();
    const [statistics,setStatistics] = useState({
        mostActive:'',
        topUsers:'',
        topFiles:'',
    })
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        async function getStat(){
            try {
                const mostActive = await getMostActiveUser();
                const response1 = mostActive.username

                const mostUsers = await groupWithMostUsers();  
                const response2 = mostUsers.group_name

                const mostFiles = await groupWithMostFiles();
                const response3 = mostFiles.group_name

                setStatistics({
                    mostActive : response1,
                    topUsers : response2,
                    topFiles : response3,
                })
            } catch (error) {
                console.log(error);
                
            } finally{
                setLoading(false)
            }
        }
        getStat()
    },[])
    
    return(
        <div className="statistics">
        <div className="stat">
            {loading 
            ? <LoadingSpinner/> 
            :   <>
                    <h3>{statistics.topUsers}</h3>
                    <h1>{t("topUsers")}</h1>
                </>
            }
        </div>
        <div className="stat">
        {loading 
            ? <LoadingSpinner/> 
            :   <>
                    <h3>{statistics.mostActive}</h3>
                    <h1>{t("mostActive")}</h1>
                </>
            }

        </div>
        <div className="stat">
        {loading 
            ? <LoadingSpinner/> 
            :   <>
                    <h3>{statistics.topFiles}</h3>
                    <h1>{t("topFiles")}</h1>
                </>
            }

        </div>
    </div>
    )
}