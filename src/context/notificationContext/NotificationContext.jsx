import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import apiRequest from "../../apiService/apiServiceCall";
import { useError } from "../errorHandlingContext/ErrorContext";
import socket from "../../socket";

const NotificationContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;

export default function NotificationProvider({children}){
    const[notifications,setNotifications] = useState([]);

    const {showError} = useError();
    const {cookies} = useAuth();

    useEffect(()=>{
        try {
            const getNotifications = async ()=>{
                const resData = await apiRequest(`notification`,'GET',{},cookies.token,showError);
                console.log('from notifications context ',resData);
                setNotifications(resData);
            };
                      
            if(cookies.token)
                getNotifications();
        } catch (err) {
            console.error(err.message);
        }      
    },[cookies.token]);

    // real time notification using socket
    useEffect(() => {
            function handleNewNotification(notification) {
            setNotifications(prev => [notification, ...prev]);
            }

            socket.on("newNotification", handleNewNotification);

            return () => {
                socket.off("newNotification", handleNewNotification);
            };
    }, []);

    const value={
        notifications,
        setNotifications
    }
    
    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function notificationInfo(){
    return useContext(NotificationContext);
}