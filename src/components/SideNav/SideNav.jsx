import { Link } from "react-router-dom";
import styles from './SideNav.module.css';
import { FaCog, FaCreativeCommonsPd, FaUser, FaUserFriends } from "react-icons/fa";

export default function SideNav(){
    return <>
        <nav className={styles.sideNav}>
            <ul>
                <li><Link to="/friendrequest" title="Friend Request"><FaUserFriends className={styles.navItem}/></Link></li>
                <li><Link to="/create" title="Create Post"><FaCreativeCommonsPd className={styles.navItem}/></Link></li>
                <li><Link to="/auth" title="Settings"><FaCog className={styles.navItem}/></Link></li>
            </ul>
        </nav>
    </>
}