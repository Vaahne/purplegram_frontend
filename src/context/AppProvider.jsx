import AuthProvider from "./authContext/auth";
import PostProvider from "./postContext/PostContext";
import NotificationProvider from "./notificationContext/NotificationContext";
import FriendRequestProvider from "./friendRequestContext/FriendRequestContext";
import UserProvider from "./userContext/UserContext";

export default function AppProvider({children}){
    return <AuthProvider>
            <UserProvider>
                <PostProvider>
                    <NotificationProvider>
                        <FriendRequestProvider>
                            {children}
                        </FriendRequestProvider>
                    </NotificationProvider>
                </PostProvider>    
            </UserProvider>
    </AuthProvider>
};