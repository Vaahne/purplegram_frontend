import socket from "../../socket.jsx";
import PostHeader from "../postHeader/PostHeader.jsx";
import styles from './Posts.module.css';
import Comments from "../Comments/Comments.jsx";
import { postsInfo } from "../../context/postContext/PostContext.jsx";
import { FaSpinner } from "react-icons/fa";
import PostBody from "../PostBody/PostBody.jsx";
import { useEffect } from "react";

export default function Posts(){
 
  const {posts,setPosts} = postsInfo();
   
  
  function handleRemove(postId){
      setPosts(prev => prev.filter((post)=>post.postId!=postId));
  }

  function loading(){
    return <FaSpinner className={styles.spinner}/>
  }
  function loaded(){
    return posts.length>0 && posts.map(post=>{
            const user = post.userId;
            return (
              <>
              <div key={post._id} className={styles.postContainer}>
                  <PostHeader  name={user.name} photo={user.photo} onClose={()=>handleRemove(post.postId)}/>
                  <div className={styles.postContent}>
                        <PostBody postType={post.postType} text={post.post_text} photo={post.post_photo} />
                  </div>
                  <div className={styles.commentSection}>
                    <p>{post.likes.length>0 ? post.likes.length + 'likes' : ''}  </p>
                    <p>{post.comments.length>0 ? post.comments.length+ 'comments' : ''}  </p>
                  </div>
                  <hr/>
                  <Comments  post={post}/>
              </div>
              </>
              )
          })
  }
  return  posts ?  loaded() : loading()
}