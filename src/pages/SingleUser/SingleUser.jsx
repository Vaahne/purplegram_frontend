import { useParams } from 'react-router-dom';
import styles from './SingleUser.module.css';
// import { userInfo } from '../../context/userContext/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';

export default function SingleUser(){
    // const {fetchUser,searchedUser} = userInfo();
    const[searchedUser,setSearchedUser] = useState();
    const baseURL = import.meta.env.VITE_baseURL;
    const {cookies} = useAuth();

    const {userId} = useParams();

    useEffect(()=>{

         async function fetchUser(){
            try {
                const userData = await apiRequest(`users/${userId}`,"GET",{},cookies.token);
                // const user = await axios(`${baseURL}/users/${userId}`,{
                //         headers:{'x-auth-token': cookies.token}
                //         });
                setSearchedUser(userData);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchUser();
    },[userId]);
 
    async function handleClick(e){
        try {
            const resData = await apiRequest(`friendreq/${userId}`,"POST",{},cookies.token);
            // const res = await axios.post(`${baseURL}/friendreq/${userId}`,{},{
            //             headers:{'x-auth-token':cookies.token}
            //             });
            console.log(resData);
        } catch (err) {
            console.error(err.message);
        }
    }
    console.log(searchedUser);
    return <div>
        {searchedUser &&  <div>{searchedUser.name}
                <img className={styles.img} src={searchedUser.photo} alt={searchedUser.name}/>
                {!searchedUser.isFriend && <button onClick={handleClick}>Connect</button>}
            </div> }
    </div>
}