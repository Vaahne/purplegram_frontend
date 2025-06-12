import { useEffect,useState } from "react";
import { useAuth } from "../../context/authContext/auth"
import { useNavigate } from "react-router-dom";
import apiRequest from "../../apiService/apiServiceCall";
import styles from './UserSearch.module.css';
import { useError } from "../../context/errorHandlingContext/ErrorContext";

export default function UserSearch({search,setSearch}){
    const {cookies} = useAuth();
    const {showError} = useError();
    const [result,setResult] = useState([]);
    const[loading,setLoading] = useState(false);
    const [showSearch,setShowSearch] = useState(true)
    const nav = useNavigate();

    useEffect(()=>{
        if(!cookies.token || !search.trim()){
            setResult([]);
        }

        setLoading(true);

        const delayDebounce = setTimeout(()=>{
            const getUsers = async()=>{
            try {
                const resData = await apiRequest('users/search',"POST",{search},cookies.token,showError);
                setResult(resData);
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
 
    function handleClick(userId){
        setSearch('');
        setShowSearch(false);
        nav(`/singleuser/${userId}`);
    }

    return   (
        <div className={styles.searchContainer}>
            {loading ? (<p >Searching...</p>) : 
            (result.length > 0) ? (showSearch && result.map(r=> <div key={r._id} onClick={()=>handleClick(r._id)}>{r.name}</div>)): <div>No Data found</div>} 
        </div>
    )
}