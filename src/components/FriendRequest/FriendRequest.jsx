import { friendRequestInfo } from '../../context/friendRequestContext/FriendRequestContext';
import { useState } from 'react';
import styles from './FriendRequest.module.css';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';

export default function FriendRequest(){
    const {friendRequest:initialFriendRequests } = friendRequestInfo();
    const {cookies} = useAuth();
    
    const[friendRequests,setFriendRequest] = useState(initialFriendRequests);

    function loading(){
           return <FaSpinner />
       }

        async function updateFriendReq(userId,status){
               try {
                   if(status == 'Accept')
                       status = 'Accepted';
                   else
                       status = 'Rejected';

                   const resData = await apiRequest(`friendreq/${userId}`,"PUT",{status},cookies.token);
                
                   console.log(resData);
               } catch (err) {
                   console.error(err.message);
               }
           }

       function handleClick(e){
          const status = e.target.innerText;
          updateFriendReq(e.target.name,status);
          console.log(e.target.name);
       }
   
       function loaded(){
           return (
            friendRequests &&   friendRequests.map(friendRequest =>{
                const sender = friendRequest.sender_id;
               return <li key={sender._id} className={styles.li} >
                    <img src={sender.photo} alt={sender.name} className={styles.img}/>
                    <p>{sender.name}</p>
                    <button name={sender._id} onClick={handleClick}>Ignore</button>
                    <button name={sender._id} onClick={handleClick}>Accept</button>
               </li>
           })
        )
      }
      return <>Friend Request
        {friendRequests ? (<ul className={styles.friendReqContainer}>{loaded()}</ul>) : loading()}
      </>
}