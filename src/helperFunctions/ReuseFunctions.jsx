import apiRequest from "../apiService/apiServiceCall";
import { useAuth } from "../context/authContext/auth";

const {cookies} = useAuth();

async function getPostComments(post){
    try {
        const resData = await apiRequest(`comments/${post._id}`,'GET',{},cookies.token,showError);
        return resData;
    } catch (err) {
        console.error(err)
    } 
               
}