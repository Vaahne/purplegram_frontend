import { Link } from "react-router-dom";
import styles from './SideNav.module.css';
import { FaCog, FaPlus, FaUserFriends } from "react-icons/fa";
import { userInfo } from "../../context/userContext/UserContext";

export default function SideNav(){
    const {user} = userInfo();
    return <>
        <nav className={styles.sideNav}>
            <ul>
                <li> <img src={user.photo} alt={user.name} className={styles.profilePic}/> <p>{user.name}</p>   </li>
                <li><Link to="/friendrequest" title="Friend Request"><FaUserFriends className={styles.navItem}/></Link></li>
                <li><Link to="/createpost" title="Create Post"><FaPlus className={styles.navItem}/></Link></li>
                <li><Link to="/settings" title="Settings"><FaCog className={styles.navItem}/></Link></li>
            </ul>
        </nav>
    </>
}