import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import axios from "axios";

const FriendRequestContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;

export default function FriendRequestProvider({children}){
    const[friendRequest,setFriendRequest] = useState([]);
   
    const {cookies} = useAuth();

    useEffect(()=>{
            const getFriendRequests = async ()=>{
                try {
                        const res = await axios(`${baseURL}/friendreq`,{
                                        headers: {'x-auth-token':cookies.token}
                                    });
                        setFriendRequest(res.data);
                    } catch (err) {
                    console.error(err.message);
                    }          
            }                            
            if(cookies.token)
                getFriendRequests();

    },[cookies.token]);

    const value={
        friendRequest,
        setFriendRequest
    }
    
    return <FriendRequestContext.Provider value={value}>{children}</FriendRequestContext.Provider>
}

export function friendRequestInfo(){
    return useContext(FriendRequestContext);
}