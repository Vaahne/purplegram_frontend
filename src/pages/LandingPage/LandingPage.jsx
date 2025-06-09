import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext/auth";
import { useNavigate } from "react-router-dom";
import styles from './LandingPage.module.css';
import purplegramLogo from '../../assets/images/PurplegramLogo.png'

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
        <div className={styles.container}>
        <div className={styles.textContainer}>
            {/* <img src={purplegramLogo} alt="Purplegram logo" className={styles.img}/> */}
            <h1 className={styles.name}>Purplegram</h1>
            <p className={styles.caption}>Connecting people to share memories on Purplegram</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <h3>Login Page</h3>
            <input type="email" placeholder="Email" name="email" onChange={handleChange} value={formData.email}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password}/>
            <input type="submit" value='Login' className={styles.login}/>
           
            <p>Don't have an account?</p>
            <Link to="/createuser"><button className={styles.signup}>Sign up</button></Link>
        </form> 
        </div>
    </>;
}