import {Outlet} from "react-router-dom";
import useWindowDimensions from "../common/Hooks/useWindowDimensions.tsx";
import Sidebar from "../common/Components/Sidebar/Sidebar.tsx";
import styles from './Routes.module.scss';
import { useEffect } from "react";

const PrivateRoutes = () => {
    const {height,width} = useWindowDimensions();
    return (
        <div className={styles.Wrapper} style={{width:width,height:height,overflow:'hidden'}}>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default PrivateRoutes;