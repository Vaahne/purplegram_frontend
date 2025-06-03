import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext/auth";
import { useNavigate } from "react-router-dom";
import styles from './LandingPage.module.css';

export default function LandingPage(){
    const {cookies} = useAuth();
    const {login} = useAuth();
    const nav = useNavigate();

    useEffect(()=>{
        if(cookies.token)
            nav('/posts');
    },[cookies]);



    const[formData,setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    async function handleSubmit(e){
        e.preventDefault();
        await login(formData);
        nav('/posts');
    }
    function redirect(){
        nav('/posts');
    }
    return <> 
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Login Page</h3>
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={formData.email}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password}/>
            <input type="submit" value='Login'/>
            {/* <div style={{display:flex}}>
                <hr/>
                <p>or</p>
                <hr/>
            </div> */}
            <Link to="/">Forgot password?</Link>
            <p>Don't have an account?<Link to="/createuser">Sign up</Link></p>
        </form> 
    </>;
}