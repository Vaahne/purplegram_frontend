import { useEffect, useState } from 'react';
import profile from '../../assets/images/profilePic.jpg';
import styles from './PostBody.module.css';
import Modal from 'react-modal';
import SinglePost from '../../pages/SinglePost/SinglePost';

export default function PostBody({postType,text,photo}){
    // const[image,setImage] = useState('');
    const[isOpen,setIsOpen] = useState(false);

    function handleClick(){
        // setIsOpen(true);
    }

    function textOnly(){
        return <div className={styles.postBody} onClick={handleClick}>
            <p>{text}</p>
        </div>
    }

    function withImage(){
        return <div className={styles.postBody} onClick={handleClick}>
            <p className={styles.text}>{text && text}</p>
            <img src={photo} alt={text}></img>
        </div>
    }

    return <>
        <Modal className={styles.modalStyle} isOpen={isOpen}  onRequestClose={()=>setIsOpen(false)}>
                       <SinglePost/>
                        <button onClick={()=>setIsOpen(false)}>Close</button>
        </Modal>    
        { postType == 'photo' ? withImage() : textOnly() }
    </>

}