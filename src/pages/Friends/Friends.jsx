import { useEffect, useState } from 'react';
import styles from './Friends.module.css';
import { FaSpinner } from 'react-icons/fa';
import { userInfo } from '../../context/userContext/UserContext';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';
import { useError } from '../../context/errorHandlingContext/ErrorContext';

export default function Friends(){
    const {user} = userInfo();
    const {cookies} = useAuth();
    const {showError} = useError();
    const[friends,setFriends] = useState(user.friends);

    useEffect(()=>{
        
        const getFriends = async() =>{
              try {
                  const res = await apiRequest('users/getfriends','GET',{},cookies.token,showError);
                  setFriends(res);
            }catch (err) {
                console.error(err.message);
            }
        }
        getFriends();
    },[]);
       
      return <>
        <h2>Friends</h2>
        <div className={styles.friendContainer}>
            {friends && friends.map(f=>{
              return <div className={styles.friend}>
                  <img src={f.photo} className={styles.img}/>
                  <p className={styles.name}>{f.name}</p>
              </div>
            })}
        </div>
      </>
}