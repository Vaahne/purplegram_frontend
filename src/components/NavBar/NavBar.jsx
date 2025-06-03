import { Link, useNavigate } from "react-router-dom";
import style from './NavBar.module.css';
import { FaBell, FaHome,  FaPencilAlt, FaSignInAlt, FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import logoLetter from '../../assets/images/LogoLetter.png'
import { useAuth } from "../../context/authContext/auth";
import LandingPage from "../../pages/LandingPage/LandingPage";

export default function NavBar(){
    const[search,setSearch] = useState('');
    const nav = useNavigate();
    const {cookies,logout} = useAuth();

    function handleSubmit(e){
        e.preventDefault();
    }

    function handleChange(e){
        setSearch(e.target.value);
    }

    function handleLogout(){
        logout();
        nav('/');
    }

    return (cookies.token ? 
        <nav className={style.nav}>
            <ul>
                <li className={style.logoLi}><Link to="/"><img src={logoLetter} className={style.logoLetter} alt=""/></Link>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <input type="text" onChange={handleChange} value={search} placeholder="Search Purplegram" />
                    </form></li>
                <li><Link to="/posts" title="Home"> <FaHome className={style.navItem} /> </Link></li>
                <li><Link to="/notifications" title="Notifications"><FaBell className={style.navItem}/></Link></li>
                <li><Link to="/friendrequest" title="Friend Request"><FaUserFriends className={style.navItem}/> </Link></li>
                <li><Link title="logout"><FaSignOutAlt className={style.navItem} onClick={handleLogout} /></Link></li>
            </ul>
        </nav> : 
        <LandingPage/>)
}