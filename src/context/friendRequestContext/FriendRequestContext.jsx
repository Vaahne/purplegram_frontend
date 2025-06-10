import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import apiRequest from "../../apiService/apiServiceCall";
import { useError } from "../errorHandlingContext/ErrorContext";

const FriendRequestContext = createContext();

export default function FriendRequestProvider({children}){

    const[friendRequests,setFriendRequests] = useState([]);

    const {showError} = useError();
    const {cookies} = useAuth();

    useEffect(()=>{
            const getFriendRequests = async ()=>{
                try {

                        const resData = await apiRequest(`friendreq`,'GET',{},cookies.token,showError);
                        setFriendRequests(resData);
                    } catch (err) {
                        console.error(err.message);
                    }          
            }                            
            if(cookies.token)
                getFriendRequests();

    },[cookies.token]);

    const value={
        friendRequests,
        setFriendRequests
    }
    
    return <FriendRequestContext.Provider value={value}>{children}</FriendRequestContext.Provider>
}

export function friendRequestInfo(){
    return useContext(FriendRequestContext);
}