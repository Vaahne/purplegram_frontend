import socket from '../../socket';
import PostHeader from '../../components/postHeader/PostHeader';
import PostBody from '../../components/PostBody/PostBody';
import styles from './SinglePost.module.css';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import apiRequest from '../../apiService/apiServiceCall';
import { useAuth } from '../../context/authContext/auth';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { userInfo } from '../../context/userContext/UserContext';
import { postsInfo } from '../../context/postContext/PostContext';
import useCommentSocket from '../../context/socketContext/useCommentSocket';

export default function SinglePost(){
    const {posts,setPosts} = postsInfo();
    const {user} = userInfo();
    const {cookies} = useAuth();
    const {showError} = useError();
    const location = useLocation();
    const nav = useNavigate();

    const {postId} = location.state || {};
    const [post,setPost] = useState(null);
    const[comments,setComments] = useState([]);
    const[commentInput,setCommentInput] = useState('');
    const[isOpen,setIsOpen] = useState(true);


    useEffect(()=>{
        if(postId){
            const updated = posts.find(p=>p._id===postId);
            if(updated) setPost(updated);
        }
    },[posts,postId]);

     useEffect(() => {  
        try {
            if (postId) {
            apiRequest(`comments/${postId}`, 'GET', {}, cookies.token, showError)
                .then(res => setComments(res.comments))
                .catch(err => showError('Failed to load comments'));
        }    
        } catch (err) {
            console.error(err);
        }   
    }, [postId, post]);


    useCommentSocket(postId, {
        onCommentCreate: (comment) => {
            setComments(prev => [...prev, comment]);
        },
        onCommentDelete: (commentId) => {
            setComments(prev => prev.filter(c => c._id !== commentId));
        },
        onCommentEdit: (commentId, updatedComment) => {
            setComments(prev => 
                prev.map(c =>
                    c._id === commentId ? { ...c, comment_text: updatedComment } : c
                )
            );
        }
    });

    function handleChange(e){
        setCommentInput(e.target.value);
    }

    async function handleAddComment(e){
        e.preventDefault();

        if(!commentInput.trim() || commentInput == '') return;

        try {
            const newComment = await apiRequest(
                                `comments/${postId}`,
                                'POST',
                                {comment: commentInput},
                                cookies.token,
                                showError);
            // socket.emit("");
            socket.emit("commentAction", {
                action: 'create',
                postId,
                comment: newComment });

            setCommentInput('');

            setPosts(prevPosts => prevPosts.map(p=> p._id == postId ? {
                    ...p,
                    comments : [...p.comments,newComment._id]
            }:p));
            // nav('/posts');    
            nav('/posts', { state: { scrollToPostId: postId } });
        } catch (err) {
            console.error(err.message);
        }
        
    }

     function handleClose() {
        setIsOpen(false);
        nav("/posts"); // Redirect after closing modal
    }

    function handleKeyDown(e){
        if(e.key == "Enter")
            handleAddComment(e);
    }

    async function handleDeleteComment(id){
        try {            
            // console.log(id);
            await apiRequest(`comments/${id}`,"DELETE",{postId},cookies.token,showError);

            socket.emit("commentAction",{
                action:"delete",
                postId,
                commentId : id
            });

            alert('Comment Deleted');

            setPosts(prevPosts =>
                  prevPosts.map(p =>
                    p._id === postId
                    ? { ...p, comments: p.comments.filter(c => c !== id) } // if you're storing just comment IDs
                    : p
                )
            );
            setComments(c=>c.filter(c=>c.id!=id));
        } catch (err) {
            console.error(err.message);
        }
    }

    async function handleEditComment(commentId, oldText) {
        const newText = prompt("Edit your comment:", oldText);
        if (!newText) return;

        try {
            await apiRequest(`comments/${commentId}`, 
                        "PUT", 
                        { comment: newText },
                         cookies.token, 
                         showError);
            
            socket.emit("commentAction", {
                action: "edit",
                postId,
                commentId,
                updatedComment: newText,
            });
            // alert('updated successfully!!!');
        } catch (err) {
            console.error("Failed to update comment:", err);
        }
    }

    // const userPost = post.userId;
    // console.log(user.name,': name \n photo:',user);  // todo

    if(!post) return <p>Loading ....</p>

    return <>
        <ModalComponent isOpen={isOpen} onClose={handleClose}>
            <div key={post._id} className={styles.postContainer}>
                <PostHeader  name={post.userId.name} photo={post.userId.photo} onClose={()=>handleClose(post.postId)}/>
                <div className={styles.postContent}>
                    <PostBody postType={post.postType} text={post.post_text} photo={post.post_photo} />
                 </div>
            <div className={styles.commentSection}>
                <p>{post.likes.length>0 ? `${post.likes.length} likes` : ''}  </p>
                <p>{post.comments.length>0 ? `${post.comments.length} comments` : ''}  </p>
                {/* <p>{comments.length > 0 ? `${comments.length} comments` : ''}</p> */}
            </div>
            <hr/>
             {comments.map(c => (
                    <div key={c._id} className={styles.comment}>
                        <strong>{c.user_id?.name || `${user.name}`}:</strong>
                        <div>{c.comment_text}</div>
                        {user && c.user_id?._id === user._id && (
                            <div className={styles.commentActions}>
                                <button onClick={() => handleEditComment(c._id, c.comment_text)}>Edit</button>
                                <button onClick={() => handleDeleteComment(c._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                ))}
            <div>
                    <input type="text" name="comment" placeholder='Add Comment' onChange={handleChange}  onKeyDown={handleKeyDown} value={commentInput}/>
            </div>
        </div> 
    </ModalComponent>
    </>
}