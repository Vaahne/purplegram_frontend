import styles from './SinglePost.module.css';

export default function SinglePost({post_id}){
    return <>
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
    </>
}