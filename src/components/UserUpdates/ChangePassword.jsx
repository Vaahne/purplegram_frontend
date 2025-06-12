import { useState,useEffect } from 'react';
import styles from './UserUpdates.module.css';
import { useAuth } from '../../context/authContext/auth';
import apiRequest from '../../apiService/apiServiceCall';
import { useError } from '../../context/errorHandlingContext/ErrorContext';

// export default function ChangePassword({setIsOpen}){
export default function ChangePassword(){

    const[formData,setFormData] = useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
    });

    const {showError} = useError();
    const {cookies} = useAuth();
    const [error,setError] = useState("");
    
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    
    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!formData.oldPassword || !formData.newPassword || !formData.confirmPassword)
            return setError('Please fill the data');
            // return alert('Please fill the data');
        if(formData.newPassword.length < 8)
            return setError('Password should be minimum 8 characters');
        if(formData.oldPassword === formData.newPassword)
            return setError('Old and new passwords cannot be same');
        if(formData.newPassword !== formData.confirmPassword)
            return setError('New password and confirm password should match');

        let res = await apiRequest('users/changepwd',"PUT",formData,cookies.token);

        if(!res)
            setError('Wrong old password');
        console.log('res from change paswd',res);
    }

    return <>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
        <input type="password" placeholder='Enter old password' onChange={handleChange} name="oldPassword" value={formData.oldPassword}/>
        <input type="password" placeholder='Enter new password' onChange={handleChange} name="newPassword" value={formData.newPassword}/>
        <input type="password" placeholder='Confirm new password' onChange={handleChange} name="confirmPassword" value={formData.confirmPassword}/>
        <input type="submit" value='Change Password'/>

        {/* <input type="button" value='cancle' onClick={()=>setIsOpen(false)} /> */}
    </form>
        {error && <div className={styles.error}>{error}</div>}

    </>
}