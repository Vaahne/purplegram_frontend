import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import axios from "axios";

const NotificationContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;

export default function NotificationProvider({children}){
    const[notifications,setNotifications] = useState([]);
   
    const {cookies} = useAuth();

    useEffect(()=>{
        try {
            const getNotifications = async ()=>{
                const res = await axios(`${baseURL}/notification`,{
                                headers: {'x-auth-token':cookies.token}
                            });
                setNotifications(res.data);
            };
                      
            if(cookies.token)
                getNotifications();
        } catch (err) {
            console.error(err.message);
        }      
    },[cookies.token]);

    const value={
        notifications,
        setNotifications
    }
    
    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function notificationInfo(){
    return useContext(NotificationContext);
}