import PostHeader from '../../components/postHeader/PostHeader';
import PostBody from '../../components/PostBody/PostBody';
import styles from './SinglePost.module.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import apiRequest from '../../apiService/apiServiceCall';
import { useAuth } from '../../context/authContext/auth';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../../components/ModalComponent/ModalComponent';

export default function SinglePost(){

    const[comment,setComment] = useState('');
    const location = useLocation();
    const nav = useNavigate();

    const {cookies} = useAuth();
    const {showError} = useError();

    const[isOpen,setIsOpen] = useState(true);

    const {postId,commentsData,post} = location.state || {} ;

    function handleChange(e){
        setComment(e.target.value);
    }

    async function handleAddComment(e){
        e.preventDefault();
        await apiRequest(`comments/${postId}`,'POST',{comment},cookies.token,showError);
        nav('/posts');
    }

     function handleClose() {
        setIsOpen(false);
        nav("/posts"); // Redirect after closing modal
    }

    function handleKeyDown(e){
        if(e.key == "Enter")
            handleAddComment(e);
    }

    const user = post.userId;

    return <>
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
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
            {commentsData.comments.length === 0 ? (
            <p>No comments yet.</p>
                ) : (
                commentsData.comments.map((c) => (
                    <div key={c._id} className={styles.comment}>
                        <strong>{c.user_id?.name || 'Anonymous'}:</strong> {c.comment_text}
                    </div>
                ))
            )}
            <div>
                    <input type="text" name="comment" placeholder='Add Comment' onChange={handleChange}  onKeyDown={handleKeyDown} value={comment}/>
                    {/* <button onClick={handleAddComment}>Add Comment</button> */}
            </div>
        </div> 
    </ModalComponent>
    </>
}