import AuthProvider from "./authContext/auth";
import PostProvider from "./postContext/PostContext";

export default function AppProvider({children}){
    return <AuthProvider>
        <PostProvider>{children}</PostProvider>
    </AuthProvider>
};