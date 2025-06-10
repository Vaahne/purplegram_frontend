import { createContext,useContext, useEffect, useState } from "react";

const ErrorContext = createContext();

export default function ErrorProvider({children}){
     const[error,setError] = useState(null);
   

    const showError = (err)=>{

        const message = err?.response?.data?.errors?.map(e => e.msg).join('\n')
             || err?.response?.data?.msg
             || err?.message
             || 'An unknown error occurred';
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