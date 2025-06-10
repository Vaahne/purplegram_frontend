import apiRequest from '../../apiService/apiServiceCall';
import { useAuth } from '../../context/authContext/auth';
import styles from './Comments.module.css';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { useNavigate } from 'react-router-dom';

export default function Comments({post}){
    const{cookies} = useAuth();
    const nav = useNavigate();
    const {showError} = useError();

    async function handleClick(e){
        if(e.target.name=='likes'){
           await apiRequest(`posts/${post._id}`,"PUT",{},cookies.token,showError);
        }else{
            const resData = await apiRequest(`comments/${post._id}`,'GET',{},cookies.token,showError);
            nav('/singlepost',{
                state: {
                    post,
                    postId: post._id,
                    commentsData : resData
                }
            });
        }
    }
    return <div className={styles.commentsContainer}>
            <div><button onClick={handleClick} name="likes">Likes</button></div>
            <div><button onClick={handleClick} name="comments">comments</button></div>
        </div>
}