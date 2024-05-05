/*
    @Description
    Base File Rendered for all routes.
    Write all the logic for redirecting before login here.
    IMP: to write logic at an app level (above router level), use App.tsx
 */


import {Outlet} from "react-router-dom";

const BaseRoute = () => {
    return <Outlet/>;
}

export default BaseRoute;