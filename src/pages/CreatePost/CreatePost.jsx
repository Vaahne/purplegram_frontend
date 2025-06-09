import { useState } from 'react';
import styles from './CreatePost.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';
import { useError } from '../../context/errorHandlingContext/ErrorContext';

export default function CreatePost(){
    const {showError} = useError();
    const nav = useNavigate();
    const {cookies} = useAuth();

    const[formData,setFormData] = useState({
        post_text: '',
        photo: '',
        postType: 'text'
    });

    function handleChange(e){
        const {name,value,type,files} = e.target;
        if(type === 'file')
            setFormData({...formData,[name]:files[0]});
        else
            setFormData({...formData,[name]:value});
    }

    async function handleSubmit(e){
            e.preventDefault();
            
            if(!formData.post_text)
                return alert('Post cannot be empty');

            if(formData.photo && formData.photo!= '')
                formData.postType = 'photo';

            // const data = new FormData();
            
            // data.append('post_text',formData.post_text);
            // data.append('photo',formData.photo);
            // data.append('postType',formData.postType);

            // await axios.post(`${baseURL}/posts`,formData,{
            //     headers :{
            //         'x-auth-token' : cookies.token
            //     }
            // });

            await apiRequest('posts',"POST",formData,cookies.token,showError);

            nav('/posts');
    }

    return <>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="textarea" placeholder='Your post feed' name="post_text" onChange={handleChange} value={formData.post_text}/>
            <input type="text" name="photo" onChange={handleChange} value={formData.photo} placeholder="Enter your image url" />
            <input type="submit" value="Create Post" />
        </form>
    </>
}