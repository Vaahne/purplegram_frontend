import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import apiRequest from "../../apiService/apiServiceCall";
import { useError } from "../errorHandlingContext/ErrorContext";

const UserContext = createContext();

export default function UserProvider({children}){
    const[user,setUser] = useState([]);
    // const[searchedUser,setSearchedUser] = useState(null);
    const {showError} = useError();
    const {cookies} = useAuth();

    useEffect(()=>{
        try {
            const getUser = async ()=>{
                const resData = await apiRequest('users/singleuser',"GET",{},cookies.token,showError);
               
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