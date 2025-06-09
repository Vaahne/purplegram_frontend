import { useEffect,useState } from 'react';
import apiRequest from '../../apiService/apiServiceCall';
import { useAuth } from '../../context/authContext/auth';
import styles from './Comments.module.css';
import { useError } from '../../context/errorHandlingContext/ErrorContext';

export default function Comments({postId}){
    const{cookies} = useAuth();
    const {showError} = useError();
    const[comments,setComments] = useState([]);
    const[newComment,setNewComment] = useState('');

    useEffect(()=>{

    },[postId]);

    async function handleClick(e){
        if(e.target.name=='likes'){
            apiRequest(`posts/${postId}`,"PUT",{},cookies.token);
        }else{
            
        }
    }
    return <div className={styles.commentsContainer}>
            <div><button onClick={handleClick} name="likes">Likes</button></div>
            <div><button onClick={handleClick} name="comments">comments</button></div>
        </div>
}