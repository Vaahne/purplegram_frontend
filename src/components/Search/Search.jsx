import styles from './Search.module.css';
import { FaSearch } from 'react-icons/fa';
// Simple search to find friends in purplegram
export default function Search(){
    return <>
        <div className={styles.searchFriends}> 
            <input type="text" placeholder='Search Friends'/>
        </div>
    </>;
}