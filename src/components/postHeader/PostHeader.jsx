 import { useContext, useEffect, useState } from 'react';
 import styles from './PostHeader.module.css';
import { FaTimes } from 'react-icons/fa';

export default function PostHeader({name,photo,onClose}){
    // post header with user image and name and also with close button
    return <>
        <div className={styles.postHeader}>
            <img className={styles.profilePic} alt="user Profile Picture" src={photo}/>
            <span className={styles.name}>{name}</span>
            <button className={styles.closePost} onClick={onClose}><FaTimes/></button>
        </div>
    </>
}