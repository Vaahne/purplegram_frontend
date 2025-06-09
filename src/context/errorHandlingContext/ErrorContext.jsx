import { createContext,useContext, useEffect, useState } from "react";
import { useAuth } from "../authContext/auth";
import apiRequest from "../../apiService/apiServiceCall";

const ErrorContext = createContext();

export default function ErrorProvider({children}){
     const[error,setError] = useState(null);
   
    // const {cookies} = useAuth();

    const showError = (err)=>{

        console.log('erro mesg ',err);


        const message = err?.response?.data?.errors?.map(e => e.msg).join('\n')
             || err?.response?.data?.msg
             || err?.message
             || 'An unknown error occurred';

        //  const message = err?.response?.data?.errors?.[0]?.msg || err?.response?.data?.msg || 
        //                      err?.message || 'An unknown error occurred';

        // if( typeof err === 'string')
        //     setError(err);
        // else if (err?.message)
        //     setError(err.message);
        // else    
            setError(message);
    };

    const clearError = () => setError(null);

    return <ErrorContext.Provider value={{error,showError,clearError}}>
        {children}
    </ErrorContext.Provider>
}

export function useError(){
    return useContext(ErrorContext);
}