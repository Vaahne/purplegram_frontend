import axios from 'axios';
import { useAuth } from '../context/authContext/auth';
// to have all CRUD here, write once and use everywhere
import { useError } from '../context/errorHandlingContext/ErrorContext';

const baseURL = import.meta.env.VITE_baseURL;
// A unique function to perform all CRUD operations into the database
export default async function apiRequest(url,method="GET",data={},token=null,showError = null){
    try {
         const headers = token ? {'x-auth-token':token} : {};
        //  console.log(token)
        // console.log(`BaseURL:  ${baseURL}/${url}`);
         const response = await axios({
                        method,
                        url:`${baseURL}/${url}`,
                        data,
                        headers
                    });
        console.log('from api request: ',response.data);
        // alert('from api request: ',response.data);
        return response.data;
    } catch (err) {        
        if(showError){
             showError(err);    
        }
        console.error(err.message);
        return null;
    }
}