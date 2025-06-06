import { useParams } from 'react-router-dom';
import styles from './SingleUser.module.css';
// import { userInfo } from '../../context/userContext/UserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext/auth';

export default function SingleUser(){
    // const {fetchUser,searchedUser} = userInfo();
    const[searchedUser,setSearchedUser] = useState();
    const baseURL = import.meta.env.VITE_baseURL;
    const {cookies} = useAuth();

    const {userId} = useParams();

    useEffect(()=>{

         async function fetchUser(){
            try {
                const user = await axios(`${baseURL}/users/${userId}`,{
                        headers:{'x-auth-token': cookies.token}
                        });
                setSearchedUser(user.data);
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchUser();
    },[userId]);
 
    async function handleClick(e){
        try {
            const res = await axios.post(`${baseURL}/friendreq/${userId}`,{},{
                        headers:{'x-auth-token':cookies.token}
                        });
            console.log(res.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    return <div>
        {searchedUser &&  <div>{searchedUser.name}
                <img src="" alt={searchedUser.name}/>
                <button onClick={handleClick}>Connect</button>
            </div> }
    </div>
}