import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import axios from "axios";
import apiRequest from "../../apiService/apiServiceCall";

const UserContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;

export default function UserProvider({children}){
    const[user,setUser] = useState([]);
    // const[searchedUser,setSearchedUser] = useState(null);
    const {cookies} = useAuth();

    useEffect(()=>{
        try {
            const getUser = async ()=>{
                const resData = await apiRequest('users/singleuser',"GET",{},cookies.token);
                // const res = await axios(`${baseURL}/users/singleuser`,{
                //                 headers: {'x-auth-token':cookies.token}
                //             });
                setUser(resData);
            };
                      
            if(cookies.token)
                getUser();
        } catch (err) {
            console.error(err.message);
        }      
    },[cookies.token]);

    // async function fetchFriendReqs(userId){
    //     try {
    //         const user = await axios(`${baseURL}/users/${userId}`,{
    //                 headers:{'x-auth-token': cookies.token}
    //                 });
    //         setSearchedUser(user.data);
    //     } catch (err) {
    //         console.error(err.message);
    //     }
    // }

    const value={
        user,
        setUser,
        // searchedUser,
        // fetchUser
    }
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function userInfo(){
    return useContext(UserContext);
}