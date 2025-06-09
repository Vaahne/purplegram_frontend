import { createContext,useContext,useMemo } from "react";
import {useCookies} from 'react-cookie';
import apiRequest from "../../apiService/apiServiceCall";
import { useError } from "../errorHandlingContext/ErrorContext";

const AuthContext = createContext();

export default function AuthProvider({children}){
    const {showError} = useError();
    const[cookies,setCookie,removeCookie] = useCookies();

    async function signUp(formData){
        const data = new FormData();
        data.append('name',formData.name);
        data.append('email',formData.email);
        data.append('password',formData.password);
        data.append('dob',formData.dob);
        data.append('gender',formData.gender);
        data.append('photo',formData.photo);

        console.log('formData : ',formData);
        const resData = await apiRequest('users/register',"POST",formData,null,showError);
        
        setCookie('token',resData.token);
    }

    async function login(formData){
        // const res = await axios.post(`${baseURL}/users/auth`,formData);
        const resData = await apiRequest('users/auth',"POST",formData,null,showError);
        setCookie('token',resData.token);
    }    

    function logout(){
        ['token'].forEach((t)=>{
            removeCookie(t);
        });
    }

    const value = useMemo(()=>({
        signUp,
        login,
        logout,
        cookies
    }),[cookies]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext);
}