import styles from './Search.module.css';
import { FaSearch } from 'react-icons/fa';
export default function Search(){
    return <>
        <div className={styles.searchFriends}> 
            <input type="text" placeholder='Search Purplegram'/>
        </div>
    </>;
}