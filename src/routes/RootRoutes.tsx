import {Suspense, useEffect} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import Loading from "../common/Components/Loading/Loading.tsx";
import {PRIVATE_ROUTES, PUBLIC_ROUTES} from "../constants/RouteConsts.ts";
import BaseRoute from "./BaseRoute.tsx";
import PrivateRoutes from "./PrivateRoutes.tsx";
import Dashboard from "../modules/Dashboard/Dashboard.tsx";


const RootRoutes = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(PRIVATE_ROUTES.BASE_PATH+'/'+PRIVATE_ROUTES.DASHBOARD);
    },[]);
    return(
        <Suspense fallback={<Loading message={'Loading Please Wait...'}/>}>
            <Routes>
                <Route path='*' element={<div>404 Page Not Found</div>}/>
                <Route path={PUBLIC_ROUTES.BASE_PATH} element={<BaseRoute/>}/>
                <Route path={PRIVATE_ROUTES.BASE_PATH} element={<PrivateRoutes/>}>
                    <Route path={PRIVATE_ROUTES.DASHBOARD} element={<Dashboard/>}/>
                </Route>

            </Routes>
        </Suspense>
    )
}

export default RootRoutes;