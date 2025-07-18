import { Link, useNavigate } from "react-router-dom";
import style from './NavBar.module.css';
import { FaBell, FaHome, FaSignOutAlt, FaUserFriends } from "react-icons/fa";
import { useState } from "react";
import logoLetter from '../../assets/images/LogoLetter.png'
import { useAuth } from "../../context/authContext/auth";
import LandingPage from "../../pages/userForms/LandingPage";
import Notifications from "../Notifications/Notifications";
import UserSearch from "../UserSearch/UserSearch";
import Modal from 'react-modal';
import ModalComponent from "../ModalComponent/ModalComponent";
//  Main nav bar 
export default function NavBar(){
    const[search,setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const nav = useNavigate();
    const {cookies,logout} = useAuth();
    const [showSearch,setShowSearch] = useState(false);
    

    function handleChange(e){
        const value = e.target.value;
        setSearch(value);
        setShowSearch(value.trim().length>0);
    }

    function handleLogout(){   
        setIsModalOpen(true);
        // return <ModalComponent>
        //     <button onClick={confirmLogout}>Logout</button>
        // </ModalComponent>     
    }

    function confirmLogout(){
        logout();
        nav('/');
        setIsModalOpen(false);
    }

    return (cookies.token ? 
        <nav className={style.nav}>
            <ul>
                <li className={style.logoLi}><Link to="/"><img src={logoLetter} className={style.logoLetter} alt=""/></Link>
                    <form className={style.form} onSubmit={(e)=>e.preventDefault()}>
                        <div className={style.searchDiv}>
                            <input type="text" onChange={handleChange} value={search} placeholder="Search Purplegram" className={style.search}/>
                            {showSearch && search.trim() && 
                            (<div className={style.searchList}>
                                <UserSearch search={search} setSearch={setSearch}/>
                            </div>)
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
            <Modal  isOpen={isModalOpen} 
                onRequestClose={() => setIsModalOpen(false)} className={style.modalContainer}>
                <div className={style.modalContent}>
                    <p>Are you sure you want to logout?</p>
                    <button onClick={confirmLogout} className={style.confirmButton}>Yes</button>
                    <button onClick={() => setIsModalOpen(false)} className={style.cancelButton}>No</button>
                </div>
            </Modal>

        </nav> : 
        <LandingPage/>)
}