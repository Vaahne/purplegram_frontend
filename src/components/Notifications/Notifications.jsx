import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import styles from './Notifications.module.css';
import { notificationInfo } from "../../context/notificationContext/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function Notifications(){
    const nav = useNavigate();
    const {notifications:initialNotifications} = notificationInfo();
    const[notifications,setNotifications] = useState(initialNotifications);

    function loading(){
        return <FaSpinner />
    }

    function handleClick(postId){
      // nav(`/singlepost/${postId}`);
    }

    function loaded(){
        return (
            notifications && notifications.map(notification =>{
            return <li key={notification.post_id} className={styles.notification} onClick={handleClick(notification.post_id)}>
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