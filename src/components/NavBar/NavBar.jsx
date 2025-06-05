import { Link, useNavigate } from "react-router-dom";
import style from './NavBar.module.css';
import { FaBell, FaHome, FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import logoLetter from '../../assets/images/LogoLetter.png'
import { useAuth } from "../../context/authContext/auth";
import LandingPage from "../../pages/LandingPage/LandingPage";
import Notifications from "../Notifications/Notifications";
import UserSearch from "../UserSearch/UserSearch";

export default function NavBar(){
    const[search,setSearch] = useState('');
    const nav = useNavigate();
    const {cookies,logout} = useAuth();
    const [showSearch,setShowSearch] = useState(false);

    function handleChange(e){
        const value = e.target.value;
        setSearch(value);
        setShowSearch(value.trim().length>0);
    }

    function handleLogout(){
        logout();
        nav('/');
    }

    return (cookies.token ? 
        <nav className={style.nav}>
            <ul>
                <li className={style.logoLi}><Link to="/"><img src={logoLetter} className={style.logoLetter} alt=""/></Link>
                    <form className={style.form} onSubmit={(e)=>e.preventDefault()}>
                        <div>
                            <input type="text" onChange={handleChange} value={search} placeholder="Search Purplegram" />
                            {showSearch && 
                            <div className={style.searchList}>
                                <UserSearch search={search}/>
                            </div>
                            }
                        </div>
                    </form></li>
                <li><Link to="/posts" title="Home"> <FaHome className={style.navItem} /> </Link></li>
                <li>
                    <div className={style.navItem}>
                        <FaBell  title="Notifications"/>
                        <div className={style.subElement}>
                            <Notifications/>
                        </div>
                    </div>
                </li>
                <li><Link to="/friendrequest" title="Friend Request"><FaUserFriends className={style.navItem}/> </Link></li>
                <li><Link title="logout"><FaSignOutAlt className={style.navItem} onClick={handleLogout} /></Link></li>
            </ul>
        </nav> : 
        <LandingPage/>)
}