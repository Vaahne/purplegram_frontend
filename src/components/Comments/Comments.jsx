import socket from '../../socket';
import apiRequest from '../../apiService/apiServiceCall';
import { useAuth } from '../../context/authContext/auth';
import styles from './Comments.module.css';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { postsInfo } from '../../context/postContext/PostContext';
import { userInfo } from '../../context/userContext/UserContext';
// import {useState} from 'react';

export default function Comments({post}){
    console.log(post);
    const{cookies} = useAuth();
    const nav = useNavigate();
    const {showError} = useError();
    const {posts,setPosts} = postsInfo();
    const {user } = userInfo();
    
    async function handleClick(e){
        if(e.target.name=='likes'){

            socket.emit("likePost",{postId: post._id,userId:user._id,toggleLike: !post.likes.includes(user._id)});
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
            {/* <div><button onClick={handleClick} name="likes">Likes</button></div> */}
            <div> 
                    <button  onClick={handleClick}  name="likes"  className={post.likes.includes(user._id) ? styles.liked : styles.unliked}>Like</button>
            </div>
            <div>
                    <button onClick={handleClick} name="comments">comments</button>
            </div>
        </div>
}