import axios from 'axios';

export const ACTIONS = {
    CREATE : 'create',
    DELETE : 'delete',
    GET : 'get',
    PUT : 'put'
}

export default function serviceCall(url,action,id,formData){
    switch(action) {
        case ACTIONS.CREATE : return post(url,formData);
        case ACTIONS.DELETE : return deleteData(url,id);
        case ACTIONS.GET : return get(url);
        case ACTIONS.PUT : return put(url,id);
    }
}

async function get(url){
    try{
        let res = await axios(url);

        if(!res)
            return 'No Data found'
        return res.data;
    }catch(err){
        console.error(err.message);        
    }
}

async function put(url,formData){
    try{
        let res = await axios.put(url,formData);
        if(!res)
            return 'Not able to put the changes'
        return res.data;
    }catch(err){
        console.error(err.message);
    }
}

async function deleteData(url,id){
    try{
        const res = await axios.delete(url,id);
        if(!res)
            return 'Cannot delete';
        return res.data;
    }catch(err){
        console.error(err.message);
    }
}

async function post(url,formData){
    try{
        let res = await axios.post(url,formData);
        if(!res)
            return 'Cannot add ';
        return res.data;
    }catch(err){
        console.error(err.message);
    }
}