import axios from 'axios';
import { useAuth } from '../context/authContext/auth';
// to have all CRUD here, write once and use everywhere
const baseURL = import.meta.env.VITE_baseURL;

export default async function apiRequest(url,method="GET",data={},token=null){
    try {
         const headers = token ? {'x-auth-token':token} : {};
         console.log(token)
         const response = await axios({
                        method,
                        url:`${baseURL}/${url}`,
                        data,
                        headers
                    });
        return response.data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}