import { useState ,useEffect } from 'react';
import styles from './CreatePost.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { postsInfo } from '../../context/postContext/PostContext';

export default function EditPost({post,onClose}){
    const {posts,setPosts} = postsInfo();

    const [error,setError] = useState('');
    const {showError} = useError();
    const nav = useNavigate();
    const {cookies} = useAuth();

    const[formData,setFormData] = useState({
        post_text: post.post_text,
        photo: post.photo,
        postType: post.postType
    });

     useEffect(() => {
            if (error) {
                const timer = setTimeout(() => setError(''), 3000);
                return () => clearTimeout(timer);
            }
    }, [error]);


    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(!formData.post_text.trim())
                return setError('Post cannot be empty');

            if(formData.photo && formData.photo!= '')
                formData.postType = 'photo';
            
            const updatedPost = await apiRequest(`posts/${post._id}`,"PUT",formData,cookies.token,showError);

            // setPosts(prev => [newPost,...(prev || [])]);
            socket.emit("updatePost", { postId, updatedPost: editData });
            setPosts(prev => prev.map(p => p._id === post._id ? updatedPost : p));

            if(onClose) onClose(null);
            // nav(-1); // takes to the previous page
        } catch (err) {
            console.error(err.message);
        }                
    }

    return <>
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Create Post</h3>
            <input type="textarea" placeholder='Your post feed' name="post_text" onChange={handleChange} value={formData.post_text}/>
            <input type="text" name="photo" onChange={handleChange} value={formData.photo} placeholder="Enter your image url" />
            <input type="submit" value="Update Post" />
        </form>
        {error && <div className={styles.error}>{error}</div>}
    </>
}