import { useState } from "react"
import { useAuth } from "../../context/authContext/auth";
import styles from './CreateUser.module.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreateUser(){
    const {signUp} = useAuth();
    const nav = useNavigate();
    const[formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        dob: '',
        photo: '',
        gender: ''
    });
    
    function handleChange(e) {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }
    
    function handleSubmit(e){
        e.preventDefault();
        if(formData.password !== formData.password2)
            return alert('Passwords should match!!');
        if(formData.password.length < 8)
            return alert('Password should be atleast 6 characters');
        if(!formData.name || !formData.email || !formData.password || !formData.photo || !formData.dob )
            return alert('Please fill all the details!!');
        signUp(formData);
        nav('/');
        // alert('success');
    }
    return <>
        <div className={styles.container}>
         <div className={styles.textContainer}>
            <h1 className={styles.name}>Purplegram</h1>
         </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h3>Register User</h3>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required value={formData.name}/>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required value={formData.email}/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required value={formData.password}/>
            <input type="password" name="password2" placeholder="Confrim password" onChange={handleChange} required vaue={formData.password2}/>
            <label>
                Gender
                <input type="radio" value="male" name="gender" onChange={handleChange} required />Male
                <input type="radio" value="female" name="gender" onChange={handleChange}/>Female
            </label>
            <input type="text" name="photo" placeholder="Enter image url" onChange={handleChange} />
            <input type="date" name="dob" placeholder="Date of birth" onChange={handleChange} required value={formData.dob}/>
            <input type="submit" value="Create user"/>
            <p>Already have an account? <span><Link to='/'>Login</Link></span></p>
        </form>
        </div>
    </>
}