import { useEffect, useState } from 'react';
import profile from '../../assets/images/profilePic.jpg';
import styles from './PostBody.module.css';

export default function PostBody({postType,text,photo}){
    const[image,setImage] = useState('');

    useEffect(()=>{
         if(photo != '' && postType == 'photo')
            setImage(`data:image/jpeg;base64,${photo}`)
         else
            setImage(profile);
    },[photo]);

    function textOnly(){
        return <div className={styles.postBody}>
            <p>{text}</p>
        </div>
    }

    function withImage(){
        return <div className={styles.postBody}>
            <p>{text && text}</p>
            <img src={image} alt={text}></img>
        </div>
    }

    return (postType == 'photo') ? withImage() : textOnly();

}