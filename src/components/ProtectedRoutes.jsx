import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext/auth";
import AuthPage from "../pages/AuthPage";
import NavBar from "./NavBar/NavBar";
import SideNav from "./SideNav/SideNav";
import { FaComment} from 'react-icons/fa';
import { WiDayCloudy } from "react-icons/wi";
import { useState } from "react";
import ModalComponent from "./ModalComponent/ModalComponent";
import Weather from "./Weather/Weather";

export default function ProtectedRoutes(){
    const {cookies} = useAuth();
    const [isWeather,setIsWeather] = useState(false);

    if(!cookies.token)
        return <AuthPage/>

    function handleClick(){
        setIsWeather(true);
    }

    return <>
         <NavBar/>
         <main className="displayContainer">
            <SideNav/>
            <div className='rightContainer'> 
                <Outlet/>
            </div>
            <div className="chat">
                {/* <Link></Link> */}
                <WiDayCloudy className="weather-icon" onClick={handleClick} title="Weather"/>
                <FaComment className="chat-icon" title="Messages"/>
            </div>
        </main>
        <ModalComponent isOpen={isWeather} onClose={()=>setIsWeather(false)}>
            <Weather/>
        </ModalComponent>
    </>
}