import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext/auth";
import AuthPage from "../pages/AuthPage";
import NavBar from "./NavBar/NavBar";
import SideNav from "./SideNav/SideNav";

export default function ProtectedRoutes(){
    const {cookies} = useAuth();

    if(!cookies.token)
        return <AuthPage/>

    return <>
         <NavBar/>
         <main className="displayContainer">
            <SideNav/>
            <div className='rightContainer'> 
                <Outlet/>
            </div>
        </main>
    </>
}