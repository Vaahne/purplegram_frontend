import {  useEffect, useReducer  } from "react";
import PostHeader from "../postHeader/PostHeader.jsx";
// import dataContext from "../../context/dataContext.jsx";
import styles from './Posts.module.css';
import Comments from "../Comments/Comments.jsx";
import { postsInfo } from "../../context/postContext/PostContext.jsx";
import commentReducer from "../../reducer/commentReducer.jsx";

export default function Posts(){
  const [tasks,dispatch] = useReducer(commentReducer,null);
  const {posts} = postsInfo();

  // const[posts,setPosts] = useState(data.Posts);

  useEffect(()=>{

  },[posts]);

  function handleRemove(postId){
      setPosts(posts.filter((post)=>post.postId!=postId));
  }

  // const posts = data.Posts;
  // const users = data.userInfo;
  
    return <>
    {

      posts.map(post=>{
            const user = post.userId;
            return (
              <>
              <div className={styles.postContainer}>
                  <PostHeader key={post._id} name={user.name} onClose={()=>handleRemove(post.postId)}/>
                  <div className={styles.postContent}>{post.post_text || post.post_photo}</div>
                  {/* <hr/> */}
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
    </>
  }