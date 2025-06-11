import { Link } from "react-router-dom";
import styles from './SideNav.module.css';
import { FaCog, FaPlus, FaUserFriends,FaTimes, FaBars } from "react-icons/fa";
import { userInfo } from "../../context/userContext/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// A simple side nav bar
export default function SideNav(){
    const {user} = userInfo();
    const [isOpen, setIsOpen] = useState(true);
    const nav = useNavigate();
    function toggleNav(){
        setIsOpen(prev=>!prev);
    }

    function handleClick(){
         nav(`/singleuser/${user._id}`);
    }

    return <>
         <div className={styles.hamburger} onClick={toggleNav}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>

        {/* <nav className={styles.sideNav}> */}
         <nav className={`${styles.sideNav} ${isOpen ? styles.open : styles.closed}`}>
            <ul>
                <li> 
                    <img src={user.photo} alt={user.name} className={styles.profilePic} onClick={handleClick}/> 
                    <p className={styles.name}>{user.name}</p>   
                </li>
                <li><Link to="/friends" title="Friends"><FaUserFriends className={styles.navItem}/></Link></li>
                <li><Link to="/createpost" title="Create Post"><FaPlus className={styles.navItem}/></Link></li>
                <li><Link to="/settings" title="Settings"><FaCog className={styles.navItem}/></Link></li>
            </ul>
        </nav>
    </>
}