import { useEffect,useState } from "react";
import { useAuth } from "../../context/authContext/auth"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserSearch({search}){
    const {cookies} = useAuth();
    const baseURL = import.meta.env.VITE_baseURL;
    const [result,setResult] = useState([]);
    const[loading,setLoading] = useState(false);
    const nav = useNavigate();

    useEffect(()=>{
        if(!cookies.token || !search.trim()){
            setResult([]);
        }

        setLoading(true);

        const delayDebounce = setTimeout(()=>{
            const getUsers = async()=>{
            try {
                const res = await axios.post(`${baseURL}/users/search`,{search},{
                                headers: {'x-auth-token':cookies.token}
                            });
                setResult(res.data);   
            } catch (err) {
                console.error(err.message);
                setResult([]);
            }finally{
                setLoading(false);
            }
            }
            getUsers();
        },500);
        return () =>clearTimeout(delayDebounce);
    },[search]);

    function loaded(){
        return result.map(r=>{
            return <div>{r.name}</div>
        })
    }
    function loadingData(){
        return <p>{search}</p>;
    }
    function handleClick(e){
        e.preventDefault();
        nav('/singleuser');
    }

    // return result ? loaded() : loadingData()
    return (
        <div>
            {loading ? (<p>Searching...</p>) : 
            result ? (result.map(r=> <div key={r._id} onClick={handleClick}>{r.name}</div>)): <div>No Data found</div>} 
        </div>
    )
}