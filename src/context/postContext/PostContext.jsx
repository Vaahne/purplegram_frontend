import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import apiRequest from "../../apiService/apiServiceCall";
import { useError } from "../errorHandlingContext/ErrorContext";

const PostContext = createContext();

export default function PostProvider({children}){
    const[posts,setPosts] = useState([]);
   
    const {showError} = useError();
    const {cookies} = useAuth();

    useEffect(()=>{
        try {
            const getPosts = async ()=>{
                const resData = await apiRequest('posts/getPosts',"GET",{},cookies.token,showError);
               
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