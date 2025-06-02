 import { useContext } from 'react';
import profile from '../../assets/images/profilePic.jpg';
 import styles from './PostHeader.module.css';
import dataContext from '../../context/dataContext.jsx';

export default function PostHeader({name,onClose}){
    let data = useContext(dataContext);

    return <>
        <div className={styles.postHeader}>
            <img className={styles.profilePic} alt="user Profile Picture" src={profile}/>
            <span>{name}</span>
            <button className={styles.closePost} onClick={onClose}>X</button>
        </div>
    </>
}