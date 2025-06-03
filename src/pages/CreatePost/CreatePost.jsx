import { useState } from 'react';
import styles from './CreatePost.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext/auth';

export default function CreatePost(){
    const baseURL = import.meta.env.VITE_baseURL;
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
        console.log('inside photo formdatafds',formData.photo);

        if(!formData.post_text)
            return alert('Post cannot be empty');
        const data = new FormData();
        data.append('post_text',formData.post_text);
        if(formData.photo != '' ){
            console.log('inside photo formdata');
            data.append('photo',formData.photo);
            data.append('postType','photo');
        }else
            data.append('postType',formData.postType);

        await axios.post(`${baseURL}/posts`,data,{
            headers :{
                'x-auth-token' : cookies.token
            }
        });
        nav('/posts');
    }

    return <>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" placeholder='Your post feed' name="post_text" onChange={handleChange} value={formData.post_text}/>
            <input type="file" name="photo" onChange={handleChange} />
            <input type="submit" value="Create Post" disabled={!formData.post_text || !formData.photo}/>
        </form>
    </>
}