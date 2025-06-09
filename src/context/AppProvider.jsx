import AuthProvider from "./authContext/auth";
import PostProvider from "./postContext/PostContext";
import NotificationProvider from "./notificationContext/NotificationContext";
import FriendRequestProvider from "./friendRequestContext/FriendRequestContext";
import UserProvider from "./userContext/UserContext";
import ErrorProvider from "./errorHandlingContext/ErrorContext";

export default function AppProvider({children}){
    return <ErrorProvider>
            <AuthProvider>
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
  </ErrorProvider>
};