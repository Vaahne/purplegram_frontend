import { useEffect, useState } from 'react';
import styles from './Friends.module.css';
import { FaSpinner } from 'react-icons/fa';
import { userInfo } from '../../context/userContext/UserContext';

export default function Friends(){
    const {user} = userInfo();

    const[friends,setFriends] = useState(user.friends);

        
       
      return <>
        <div>Friends</div> 
        {friends && friends.map()}
      </>
}