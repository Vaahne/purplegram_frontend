import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import axios from "axios";
import apiRequest from "../../apiService/apiServiceCall";

const PostContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;

export default function PostProvider({children}){
    const[posts,setPosts] = useState([]);
   
    const {cookies} = useAuth();

    useEffect(()=>{
        try {
            const getPosts = async ()=>{
                const resData = await apiRequest('posts/getPosts',"GET",{},cookies.token);
                // const res = await axios(`${baseURL}/posts/getPosts`,{
                //                 headers: {'x-auth-token':cookies.token}
                //             });
                setPosts(resData);
            };
                      
            if(cookies.token)
                getPosts();
        } catch (err) {
            console.error(err.message);
        }      
    },[cookies.token]);

    const value={
        posts,
        setPosts
    }
    
    return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

export function postsInfo(){
    return useContext(PostContext);
}