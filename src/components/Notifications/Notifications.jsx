import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import styles from './Notifications.module.css';
import { notificationInfo } from "../../context/notificationContext/NotificationContext";

export default function Notifications(){

    const {notifications:initialNotifications} = notificationInfo();
    const[notifications,setNotifications] = useState(initialNotifications);

    function loading(){
        return <FaSpinner />
    }

    function loaded(){
        return (
            notifications && notifications.map(notification =>{
            return <li key={notification.post_id} className={styles.notification}>
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