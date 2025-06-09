import { useState } from 'react';
import styles from './ChangePassword.module.css';
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

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!formData.oldPassword || !formData.newPassword || !formData.confirmPassword)
            return alert('Please fill the data');
        if(formData.newPassword.length < 8)
            return alert('Password should be minimum 8 characters');
        if(formData.oldPassword === formData.newPassword)
            return alert('Old and new passwords cannot be same');
        if(formData.newPassword !== formData.confirmPassword)
            return alert('New password and confirm password should match');

        let res = await apiRequest('users/changepwd',"PUT",formData,cookies.token,showError);

        console.log('res from change paswd',res);
    }

    return <form onSubmit={handleSubmit} className={styles.form}>
        <input type="password" placeholder='Enter old password' onChange={handleChange} name="oldPassword" value={formData.oldPassword}/>
        <input type="password" placeholder='Enter new password' onChange={handleChange} name="newPassword" value={formData.newPassword}/>
        <input type="password" placeholder='Confirm new password' onChange={handleChange} name="confirmPassword" value={formData.confirmPassword}/>
        <input type="submit" value='Change Password'/>
        <input type="button" value='cancle' />
    </form>
}