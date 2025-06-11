import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import styles from './Notifications.module.css';
import { notificationInfo } from "../../context/notificationContext/NotificationContext";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../context/userContext/UserContext";
import { postsInfo } from "../../context/postContext/PostContext";
import { useError } from "../../context/errorHandlingContext/ErrorContext";
import { useAuth } from "../../context/authContext/auth";
import apiRequest from "../../apiService/apiServiceCall";

export default function Notifications(){
    const nav = useNavigate();
    const {notifications:initialNotifications} = notificationInfo();
    const[notifications,setNotifications] = useState(initialNotifications);

     const{cookies} = useAuth();
     const {showError} = useError();
     const {posts,setPosts} = postsInfo();
     const {user } = userInfo();

    function loading(){
        return <FaSpinner />
    }

    async function handleClick(postId){
        try {
            const commentsData = await apiRequest(`comments/${postId}`,'GET',{},cookies.token,showError);
            const post = posts.find(p=>p._id === postId);
            console.log(`post : ${posts}`);
            nav(`/singlepost`,{state:{
                commentsData,
                postId,
                post
            }});
        } catch (err) {
          console.error(err.message);
        }
    }

    function loaded(){
        return (
            notifications && notifications.map(notification =>{
            return <li key={notification.post_id} className={styles.notification} onClick={()=>handleClick(notification.post_id)}>
                    <img className={styles.img} src={notification.fromUserId.photo} alt={notification.fromUserId.name}/>
                    <span>{notification.fromUserId.name} {" "}</span>
                    {notification.notification_type == 'post' ? "posted on their timeline" : notification.notification_type+"ed on your post"}
            </li>
        })
     )
   }
   return <>Notifications
     {notifications ? (<ul className={styles.notificationContainer}>{loaded()}</ul>) : loading()}
   </>
}