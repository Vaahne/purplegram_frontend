import { Link } from "react-router-dom";

export default function LandingPage(){
    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username or email"/>
            <input type="password" placeholder="Password"/>
            <button>Login</button>
            <div style={{display:flex}}>
                <hr/>
                <p>or</p>
                <hr/>
            </div>
            <Link to="/">Forgot password?</Link>
            <p>Don't have an account?<Link to="createUser">Sign up</Link></p>
        </form>
    </>;
}