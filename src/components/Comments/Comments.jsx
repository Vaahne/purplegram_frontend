import { useAuth } from '../../context/authContext/auth';
import styles from './Comments.module.css';
import axios from 'axios';

export default function Comments({postId}){
    const{cookies} = useAuth();
    const baseURL = import.meta.env.VITE_baseURL;

    async function handleClick(e){
        if(e.target.name=='likes'){
            await axios.put(`${baseURL}/posts/${postId}`,{},{
                headers:{'x-auth-token':cookies.token}
            });
            alert('Like status updated!!');
        }else{
            
        }
    }
    return <div className={styles.commentsContainer}>
            <div><button onClick={handleClick} name="likes">Likes</button></div>
            <div><button onClick={handleClick} name="comments">comments</button></div>
        </div>
}