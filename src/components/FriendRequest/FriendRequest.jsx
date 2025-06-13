import { friendRequestInfo } from '../../context/friendRequestContext/FriendRequestContext';
import styles from './FriendRequest.module.css';
import { FaSpinner } from 'react-icons/fa';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { userInfo } from '../../context/userContext/UserContext';

export default function FriendRequest() {
    const { friendRequests, setFriendRequests } = friendRequestInfo();
    const { cookies } = useAuth();
    const {user} = userInfo();

    const { showError } = useError();

    function loading() {
        return <FaSpinner />
    }

    async function updateFriendReq(userId, status) {
        try {
            const resData = await apiRequest(`friendreq/${userId}`, "PUT", { status }, cookies.token, showError);
            console.log(`resdata sender :${userId} , receiverId: ${user._id}`);
            if(status == 'Accepted')
                 socket.emit("acceptFriendRequest", { senderId: userId, receiverId: user._id });
            else
                socket.emit("declineFriendRequest", { senderId: userId, receiverId: user._id });
       
            // console.log(resData);
            setFriendRequests(prevRequests => prevRequests.filter(req => req.sender_id._id !== userId));
        } catch (err) {
            console.error(err.message);
        }
    }

    function handleAccept(userId) {
        updateFriendReq(userId, 'Accepted');
    }

    function handleIgnore(userId) {
        updateFriendReq(userId, 'Rejected');
    }


    // shows the friend requests where a user can ignore or accept    
    function loaded() {
        if(friendRequests.length == 0) return <h3>No pending Friend requests!!</h3>
        return (
             friendRequests.map(friendRequest => {
                const sender = friendRequest.sender_id;
                return <li key={sender._id} className={styles.li} >
                    <img src={sender.photo} alt={sender.name} className={styles.img} />
                    <p>{sender.name}</p>
                    <button onClick={()=>handleIgnore(sender._id)}>Ignore</button>
                    <button onClick={()=>handleAccept(sender._id)}>Accept</button>
                </li>
            })
        )
    }
    return <> <p className={styles.frnTitle}>Friend Request</p>
        {friendRequests ? (<ul className={styles.friendReqContainer}>{loaded()}</ul>) : loading()}
    </>
}