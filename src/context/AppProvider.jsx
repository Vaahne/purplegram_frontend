import AuthProvider from "./authContext/auth";
import PostProvider from "./postContext/PostContext";
import NotificationProvider from "./notificationContext/NotificationContext";
import FriendRequestProvider from "./friendRequestContext/FriendRequestContext";

export default function AppProvider({children}){
    return <AuthProvider>
        <PostProvider>
            <NotificationProvider>
                <FriendRequestProvider>
                    {children}
                </FriendRequestProvider>
            </NotificationProvider>
        </PostProvider>        
    </AuthProvider>
};