import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import apiRequest from "../../apiService/apiServiceCall";
import { useError } from "../errorHandlingContext/ErrorContext";

const FriendRequestContext = createContext();

export default function FriendRequestProvider({children}){
    const[friendRequest,setFriendRequest] = useState([]);

    const {showError} = useError();
    const {cookies} = useAuth();

    useEffect(()=>{
            const getFriendRequests = async ()=>{
                try {

                        const resData = await apiRequest(`friendreq`,'GET',{},cookies.token,showError);
                        setFriendRequest(resData);
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