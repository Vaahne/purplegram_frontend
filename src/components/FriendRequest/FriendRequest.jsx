import { friendRequestInfo } from '../../context/friendRequestContext/FriendRequestContext';
import styles from './FriendRequest.module.css';
export default function FriendRequest(){
    const {friendRequests:initialFriendRequests} = friendRequestInfo();
    
    const[friendRequests,setFriendRequest] = useState(initialFriendRequests);

    function loading(){
           return <FaSpinner />
       }
   
       function loaded(){
           return (
               friendRequests.map(friendRequest =>{
               return <li key={friendRequest.post_id} className={styles.notification}>
                       <span>{friendRequest.fromUserId.name} {" "}</span>
                       {friendRequest.notification_type == 'post' ? "posted on their timeline" : notification.notification_type+"ed on your post"}
               </li>
           })
        )
      }
      return <>Notifications
        {notifications ? (<ul className={styles.notificationContainer}>{loaded()}</ul>) : loading()}
      </>
}