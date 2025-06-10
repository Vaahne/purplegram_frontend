import { useState } from 'react';
import styles from './UserUpdates.module.css';
import { userInfo } from '../../context/userContext/UserContext';
import apiRequest from '../../apiService/apiServiceCall';
import { useAuth } from '../../context/authContext/auth';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { useNavigate } from 'react-router-dom';

export default function UpdateDetails(){
    const {user} = userInfo();    
    const {cookies} = useAuth();
    const {showError} = useError();
    const nav = useNavigate();

    const[formData,setFormData] = useState({
        name: user.name,
        email: user.email,
        photo: user.photo,
        dob: user.dob
    });

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.photo || !formData.dob)
            return alert('Please fill all the feilds'); 
        await apiRequest('users','PUT',formData,cookies.token,showError);
        nav('/posts');
    }

    return <>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text"  name="name" onChange={handleChange} value={formData.name}/>
            <input type="email" name="email" onChange={handleChange} value={formData.email}/>
            <input type="photo" name="photo" onChange={handleChange} value={formData.photo}/>
            <input type="date" name="dob"  onChange={handleChange} value={formData.dob}/>
            <input type="submit" value="Update Details" />
            {/* <input type="button" value='cancle' onClick={()=>setIsOpen(false)} /> */}
        </form>
    </>
}