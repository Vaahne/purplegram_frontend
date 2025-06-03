import {  useEffect, useReducer ,useState } from "react";
import PostHeader from "../postHeader/PostHeader.jsx";
// import dataContext from "../../context/dataContext.jsx";
import styles from './Posts.module.css';
import Comments from "../Comments/Comments.jsx";
import { postsInfo } from "../../context/postContext/PostContext.jsx";
import commentReducer from "../../reducer/commentReducer.jsx";
import { FaSpinner } from "react-icons/fa";
import PostBody from "../PostBody/PostBody.jsx";

export default function Posts(){
  const [tasks,dispatch] = useReducer(commentReducer,null);
  // takes the posts and renames to initialposts;
  const {posts:initialPosts} = postsInfo();
  const[posts,setPosts] = useState(initialPosts);

  // useEffect(()=>{

  // },[posts]);

  function handleRemove(postId){
      setPosts(prev => prev.filter((post)=>post.postId!=postId));
  }

  // const posts = data.Posts;
  // const users = data.userInfo;

  function loading(){
    return <FaSpinner className={styles.spinner}/>
  }
  function loaded(){
    return posts.map(post=>{
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
                  <Comments postId={post._id}/>
              </div>
              </>
              )
          })
  }
  return  posts ?  loaded() : loading()
}