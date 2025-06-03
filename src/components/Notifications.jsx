import { useEffect, useState } from "react"
import { FaSpinner } from "react-icons/fa";
import axios from 'axios';
import { useAuth } from "../context/authContext/auth";

export default function Notifications(){
    
    const[notifications,setNotifications] = useState('');
    const baseURL = import.meta.env.VITE_baseURL;
    const {cookies} = useAuth();

    useEffect(()=>{
        async function getNotifications(){
            const res = await axios(`${baseURL}/notification`,{
                                headers:{'x-auth-token':cookies.token}
                        });
            setNotifications(res.data);
        }
        getNotifications();
    },[]);

    function loading(){
        return <FaSpinner />
    }

    function loaded(){
        return notifications;
    }

    return notifications ? loaded() : loading();
}