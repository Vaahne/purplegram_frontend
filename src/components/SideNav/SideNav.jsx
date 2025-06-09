import { Link } from "react-router-dom";
import styles from './SideNav.module.css';
import { FaCog, FaPlus, FaUserFriends,FaTimes, FaBars } from "react-icons/fa";
import { userInfo } from "../../context/userContext/UserContext";
import { useState } from "react";

export default function SideNav(){
    const {user} = userInfo();
    const [isOpen, setIsOpen] = useState(true);

    function toggleNav(){
        setIsOpen(prev=>!prev);
    }

    return <>
         <div className={styles.hamburger} onClick={toggleNav}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

        {/* <nav className={styles.sideNav}> */}
         <nav className={`${styles.sideNav} ${isOpen ? styles.open : styles.closed}`}>
            <ul>
                <li> <img src={user.photo} alt={user.name} className={styles.profilePic}/> <p>{user.name}</p>   </li>
                <li><Link to="/friendrequest" title="Friend Request"><FaUserFriends className={styles.navItem}/></Link></li>
                <li><Link to="/createpost" title="Create Post"><FaPlus className={styles.navItem}/></Link></li>
                <li><Link to="/settings" title="Settings"><FaCog className={styles.navItem}/></Link></li>
            </ul>
        </nav>
    </>
}