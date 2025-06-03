 import { useContext, useEffect, useState } from 'react';
import profile from '../../assets/images/profilePic.jpg';
 import styles from './PostHeader.module.css';
// import dataContext from '../../context/dataContext.jsx';

export default function PostHeader({name,photo,onClose}){
    // let data = useContext(dataContext);
    const[image,setImage] = useState("");

      useEffect(()=>{
        if(photo != 'defaultPhoto')
            setImage(`data:image/jpeg;base64,${photo}`)
        else
            setImage(profile);
    },[photo]);

    return <>
        <div className={styles.postHeader}>
            <img className={styles.profilePic} alt="user Profile Picture" src={image}/>
            <span>{name}</span>
            <button className={styles.closePost} onClick={onClose}>X</button>
        </div>
    </>
}