import { useState ,useEffect } from 'react';
import styles from './CreatePost.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { postsInfo } from '../../context/postContext/PostContext';

export default function CreatePost(){
    const {posts,setPosts} = postsInfo();

    const [error,setError] = useState('');
    const {showError} = useError();
    const nav = useNavigate();
    const {cookies} = useAuth();

    const[formData,setFormData] = useState({
        post_text: '',
        photo: '',
        postType: 'text'
    });

     useEffect(() => {
            if (error) {
                const timer = setTimeout(() => setError(''), 3000);
                return () => clearTimeout(timer);
            }
    }, [error]);


    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
        // const {name,value,type,files} = e.target;
        // if(type === 'file')
        //     setFormData({...formData,[name]:files[0]});
        // else
            // setFormData({...formData,[name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {
            if(!formData.post_text.trim())
                return setError('Post cannot be empty');

            if(formData.photo && formData.photo!= '')
                formData.postType = 'photo';
            
            const newPost = await apiRequest('posts',"POST",formData,cookies.token,showError);

            setPosts(prev => [newPost,...(prev || [])]);

            nav('/posts');
        } catch (err) {
            console.error(err.message);
        }                
    }

    return <>
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Create Post</h3>
            <input type="textarea" placeholder='Your post feed' name="post_text" onChange={handleChange} value={formData.post_text}/>
            <input type="text" name="photo" onChange={handleChange} value={formData.photo} placeholder="Enter your image url" />
            <input type="submit" value="Create Post" />
        </form>
        {error && <div className={styles.error}>{error}</div>}
    </>
}