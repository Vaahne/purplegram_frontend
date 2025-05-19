import {  useContext, useEffect, useState } from "react";
import PostHeader from "../postHeader/PostHeader.jsx";
import dataContext from "../../context/dataContext.jsx";
import style from './Posts.module.css';

export default function Posts(){
  const data = useContext(dataContext);

  const[posts,setPosts] = useState(data.Posts);

  useEffect(()=>{

  },[posts]);

  function handleRemove(postId){
      setPosts(posts.filter((post)=>post.postId!=postId));
  }

  // const posts = data.Posts;
  const users = data.Users;
  
    return <>
    {
      posts.map(post=>{
            const user = users.find((u) => u.userId == post.userId)
            return (
              <>
              <div className={style.postContainer}>
                <PostHeader key={post.postId} name={user.name} onClose={()=>handleRemove(post.postId)}/>
                <div>{post.post_text || post.post_photo}</div>
                <hr/>
                <div>Comment Section</div>
              </div>
              </>
              )
          })
    }
    </>
  }