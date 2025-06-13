import { useEffect, useState } from 'react';
import styles from './UserUpdates.module.css';
import { userInfo } from '../../context/userContext/UserContext';
import apiRequest from '../../apiService/apiServiceCall';
import { useAuth } from '../../context/authContext/auth';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import { useNavigate } from 'react-router-dom';

export default function UpdateDetails(){
    const {user,setUser} = userInfo();    
    const {cookies} = useAuth();
    const {showError} = useError();
    const nav = useNavigate();
    const [error,setError] = useState("");


    const[formData,setFormData] = useState({
        name: user.name,
        email: user.email,
        photo: user.photo,
        dob: user.dob
    });

    useEffect(()=>{
        if (error) {
            const timer = setTimeout(() => setError(''), 3000);
            return () => clearTimeout(timer);
        }
    },[error]);

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.photo || !formData.dob)
            return setError('Please fill all the feilds'); 
        const status = await apiRequest('users','PUT',formData,cookies.token,showError);
        if(status) setUser({...user,photo:formData.photo,name:formData.name,email:formData.email});
        nav('/');
    }

    return <div>
        <h3>Update user details</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text"  name="name" onChange={handleChange} value={formData.name}/>
            <input type="email" name="email" onChange={handleChange} value={formData.email}/>
            <input type="text" name="photo" onChange={handleChange} value={formData.photo}/>
            <input type="date" name="dob"  onChange={handleChange} value={formData.dob}/>
            <input type="submit" value="Update Details" />
        </form>
        {error && <div className={styles.error}>{error}</div>}        
    </div>
}