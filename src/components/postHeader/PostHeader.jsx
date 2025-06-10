 import { useContext, useEffect, useState } from 'react';
 import styles from './PostHeader.module.css';

export default function PostHeader({name,photo,onClose}){
   
    return <>
        <div className={styles.postHeader}>
            <img className={styles.profilePic} alt="user Profile Picture" src={photo}/>
            <span className={styles.name}>{name}</span>
            <button className={styles.closePost} onClick={onClose}>X</button>
        </div>
    </>
}