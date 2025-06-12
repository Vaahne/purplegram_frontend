import { useEffect, useState } from 'react';
import profile from '../../assets/images/profilePic.jpg';
import styles from './PostBody.module.css';
import Modal from 'react-modal';
import SinglePost from '../../pages/SinglePost/SinglePost';
import { motion } from 'framer-motion';

export default function PostBody({postType,text,photo}){
    // const[image,setImage] = useState('');
    const[isOpen,setIsOpen] = useState(false);

    function handleClick(){
        // setIsOpen(true);
    }

    function textOnly(){
        return (  <motion.div 
                className={styles.postBody} 
                whileHover={{ scale: 1.02 }} 
                transition={{ duration: 0.2 }}
            >
                <p className={styles.text}>{text}</p>
            </motion.div>)
    }

    function withImage(){
        return ( 
         <motion.div className={styles.postBody} whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
                <p className={styles.text}>{text && text}</p>
                <motion.img src={photo} alt={text} className={styles.postImg} 
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}/>
        </motion.div>)
    }

    // this is post body with image or text 
    return <>
        <Modal className={styles.modalStyle} isOpen={isOpen}  onRequestClose={()=>setIsOpen(false)}>
                       <SinglePost/>
                        <button onClick={()=>setIsOpen(false)}>Close</button>
        </Modal>    
        { postType == 'photo' ? withImage() : textOnly() }
    </>

}