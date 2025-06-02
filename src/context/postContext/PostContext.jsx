import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import axios from "axios";

const PostContext = createContext();
const baseURL = import.meta.env.VITE_baseURL;

export default function PostProvider({children}){
    const[posts,setPosts] = useState([]);
    const {cookies} = useAuth();

    useEffect(()=>{
        const getPosts = async ()=>{
            const res = await axios(`${baseURL}/posts/getPosts`,{
                            headers: {'x-auth-token':cookies.token}
                        });
            setPosts(res.data);
            
        };
        
        if(cookies.token)
            getPosts();
    },[cookies.token]);

    const value={
        posts,
        setPosts
    }
    
    return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}

export function friendPosts(){
    return useContext(PostContext);
}