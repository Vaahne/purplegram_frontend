import { useEffect } from "react";
import socket from "../../socket";
import { postsInfo } from "../../context/postContext/PostContext";
import { friendRequestInfo } from "../friendRequestContext/FriendRequestContext";
import { notificationInfo } from "../notificationContext/NotificationContext";

export default function useSocket() {

  const { setPosts } = postsInfo();
  const {setFriendRequests} = friendRequestInfo();
  const {setNotifications} = notificationInfo();

  useEffect(() => {
    console.log("Socket useEffect mounted");

    socket.on("updateLikes", ({ postId, userId, toggleLike }) => {
      console.log("Received updateLikes", { postId, userId, toggleLike });
      setPosts(prev =>
        prev.map(post =>
          post._id === postId
            ? {
                ...post,
                likes: toggleLike
                  ? [...post.likes, userId]
                  : post.likes.filter(id => id !== userId),
              }
            : post
        )
      );
    });

    // Comments
    socket.on("commentCreated",({postId,comment})=>{
        setPosts(prev =>
             prev.map(post => {
               return  post._id === postId
                    ? { ...post, comments: [...post.comments, comment] }
                    : post            
            })
        );
    });

 // COMMENT: Delete
  socket.on("commentDeleted", ({ postId, commentId }) => {
    console.log('inside the commnet delete socket ');
    setPosts(prev =>
      prev.map(post =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter(c => c._id !== commentId),
            }
          : post
      )
    );
  });


   // COMMENT: Edit
  socket.on("commentEdited", ({ postId, updatedComment }) => {
    console.log('Comment edited socket ');
    setPosts(prev =>
      prev.map(post =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map(c =>
                c._id === updatedComment._id ? updatedComment : c
              ),
            }
          : post
      )
    );
   });

    // Friend Request
     socket.on("newFriendRequest", ({ request }) => {
      setFriendRequests(prev => [request, ...prev]);
    });

    //  Notifications
    socket.on("newNotification", (notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      socket.off("updateLikes");
      socket.off("newFriendRequest");
      socket.off("newNotification");
      socket.off("updateComments");
      socket.off("commentDeleted");
      socket.off("commentEdited");
    };
  }, []);
}